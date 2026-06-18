import React, { useEffect, useState, useRef } from 'react';
import rendezVousService from '../../../Services/RendezVousService';
import personnelService from '../../../Services/PersonnelService';
import authService from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const ReserverRdv = () => {
  const [personnel, setPersonnel] = useState([]);
  const [form, setForm] = useState({ objet: '', programme: '', personnelId: '' });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const p = await personnelService.getAll();
        // Ensure we handle the response properly whether it's wrapped in a 'data' object or just an array
        setPersonnel(Array.isArray(p) ? p : (p?.data || []));
      } catch (err) {
        console.error('Erreur lors du chargement des professionnels:', err);
      }
    };
    load();
  }, []);

  // fetch booked slots when selected personnel or date changes
  useEffect(() => {
    const fetchBooked = async () => {
      const pid = Number(form.personnelId);
      const date = form.date;
      if (!Number.isFinite(pid) || !date) {
        setBookedSlots([]);
        return;
      }
      try {
        const allRes = await rendezVousService.getByPersonnel(pid);
        const all = Array.isArray(allRes) ? allRes : (allRes?.data || []);
        const slots = (all || []).filter(rv => {
          if (!rv.programme) return false;
          const d = new Date(rv.programme);
          // compare date portion
          const rvDate = d.toISOString().slice(0,10);
          return rvDate === date;
        }).map(rv => {
          const t = new Date(rv.programme);
          return t.toTimeString().slice(0,5); // HH:MM
        });
        setBookedSlots(slots);
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous pour vérification:', err);
        setBookedSlots([]);
      }
    };
    fetchBooked();
  }, [form.personnelId, form.date]);

  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // helpers for date/time constraints
  const tomorrowISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0,10);
  };

  const isWeekend = (isoDate) => {
    const d = new Date(isoDate);
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = 9 * 60; // 09:00 in minutes
    const end = 16 * 60; // 16:00
    for (let m = start; m <= end; m += 30) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      const time = `${hh}:${mm}`;
      // exclude lunch 13:00 and 13:30
      if (time === '13:00' || time === '13:30') continue;
      slots.push(time);
    }
    return slots;
  };

  // If date/personnel changes and the currently selected time becomes invalid/booked, clear it
  useEffect(() => {
    if (!form.time) return;
    const available = generateTimeSlots();
    if (!available.includes(form.time) || bookedSlots.includes(form.time)) {
      setForm({ ...form, time: '' });
    }
  }, [form.date, form.personnelId, bookedSlots]);

  // debug: log time changes
  useEffect(() => {
    if (form.time) console.debug('Selected time changed:', form.time);
  }, [form.time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = authService.getCurrentUser();
    
    // Extract patient ID based on your auth logic
    const patientIdRaw = user?.id ?? user?.id_utilisateur ?? user?.idPatient ?? null;
    
    if (!user || !patientIdRaw || !user.email) {
      setErrorMsg('Utilisateur non authentifié. Veuillez vous reconnecter.');
      return;
    }
    if (!captchaToken) {
      setErrorMsg('Veuillez valider le captcha.');
      return;
    }
    if (!form.objet || !form.date || !form.time || !form.personnelId) {
      setErrorMsg('Veuillez remplir tous les champs.');
      return;
    }

    // Prepare patient id (numeric) and personnel id (expect numeric id_per from backend)
    const patientIdVal = Number(patientIdRaw);
    if (!Number.isFinite(patientIdVal)) {
      setErrorMsg("Identifiant patient invalide. Veuillez vous reconnecter.");
      return;
    }

    const personnelIdNum = Number(form.personnelId);
    if (!Number.isFinite(personnelIdNum)) {
      setErrorMsg("Identifiant professionnel invalide. Veuillez sélectionner un professionnel.");
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // combine date and time into ISO programme
      // build local datetime string (no timezone) to preserve selected local time
      const localDateTime = `${form.date}T${form.time}:00`;
      const testD = new Date(localDateTime);
      if (Number.isNaN(testD.getTime())) {
        setErrorMsg('Date/heure invalide.');
        setLoading(false);
        return;
      }

      const payload = {
        email: user.email,
        objet: form.objet,
        programme: localDateTime,
        patientId: patientIdVal,
        personnelId: personnelIdNum,
        recaptchaToken: captchaToken
      };

      console.debug('ReserverRdv: submit payload', payload);
      const res = await rendezVousService.create(payload);
      console.debug('ReserverRdv: server response', res);
      // reset recaptcha after successful submit
      try { recaptchaRef.current?.reset(); } catch (e) {}
      setCaptchaToken('');
      // Redirect on success
      navigate('/patient/rendez-vous');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.response?.data || err.message || 'Erreur lors de la réservation.';
      setErrorMsg(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] py-12 px-4 flex flex-col items-center">
      <header className="text-center mb-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-2">Réserver un rendez‑vous</h1>
        <p className="text-sm text-on-surface-variant">Planifiez votre prochaine consultation en quelques clics.</p>
      </header>

      <div className="w-full max-w-xl">
        <div className="glass-card custom-shadow rounded-xl border border-outline-variant/30 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
        
        

            {errorMsg && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                {errorMsg}
              </div>
            )}
        
            <div>
              <label className="text-sm mb-1 block">Objet de la consultation</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">description</span>
                <input
                  name="objet"
                  value={form.objet}
                  onChange={handleChange}
                  placeholder="Motif de la consultation..."
                  className="w-full pl-10 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none input-focus-ring"
                />
              </div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Date souhaitée</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">calendar_month</span>
                  <input
                    name="date"
                    type="date"
                    value={form.date || ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v < tomorrowISO()) {
                        setErrorMsg('Veuillez choisir une date à partir de demain.');
                        setForm({ ...form, date: '' });
                        return;
                      }
                      if (isWeekend(v)) {
                        setErrorMsg('Les weekends ne sont pas autorisés. Choisissez un jour en semaine.');
                        setForm({ ...form, date: '' });
                        return;
                      }
                      setErrorMsg('');
                      setForm({ ...form, date: v });
                    }}
                    min={tomorrowISO()}
                    className="w-full pl-10 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none input-focus-ring cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm mb-1 block">Heure préférée</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">schedule</span>
                  <select
                    name="time"
                    value={form.time || ''}
                    onChange={handleChange}
                    disabled={!form.date || !form.personnelId}
                    className="w-full pl-10 pr-8 py-2 bg-surface border border-outline-variant rounded-lg appearance-none input-focus-ring cursor-pointer"
                  >
                    <option value="" disabled>Choisir un créneau</option>
                    {generateTimeSlots().map((t) => (
                      <option key={t} value={t} disabled={bookedSlots.includes(t)}>{t}{bookedSlots.includes(t) ? ' (Indisponible)' : ''}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm mb-1 block">Professionnel de santé</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">medical_services</span>
                {personnel.length === 0 ? (
                  <div className="text-sm text-on-surface-variant p-2 border rounded bg-surface-container-low">Aucun professionnel disponible pour le moment.</div>
                ) : (
                  <select
                    name="personnelId"
                    value={form.personnelId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-8 py-2 bg-surface border border-outline-variant rounded-lg appearance-none input-focus-ring cursor-pointer"
                  >
                    <option value="" disabled>Sélectionner un praticien</option>
                    {personnel.map((p) => {
                      const rawId = p.id_per ?? p.idPer ?? p.id ?? null;
                      if (rawId === null || rawId === undefined) return null;
                      const value = String(rawId);
                      const label = p.nom || p.email || 'Professionnel';
                      return (
                        <option key={`personnel-${value}`} value={value}>{label}</option>
                      );
                    })}
                  </select>
                )}
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => { setCaptchaToken(token); setErrorMsg(''); }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-bold py-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                {loading ? 'Envoi...' : 'Réserver maintenant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ReserverRdv;