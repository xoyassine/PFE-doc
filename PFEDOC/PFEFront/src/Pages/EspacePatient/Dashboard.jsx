
import React, { useEffect, useState } from 'react';
import authService from '../../Services/AuthService';
import rendezVousService from '../../Services/RendezVousService';
import consultationService from '../../Services/ConsultationService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [rdvs, setRdvs] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const user = authService.getCurrentUser();
        if (!user) return;
        const patientId = user.id || user.user?.id;

        const [rdvRes, consultRes] = await Promise.all([
          rendezVousService.getByPatient(patientId),
          consultationService.getConsultationsByPatientId(patientId),
        ]);

        setRdvs(rdvRes || []);
        setConsultations(consultRes || []);
      } catch (err) {
        console.error('Dashboard load error', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-4">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Bienvenue</h1>
          <p className="text-sm text-on-surface-variant">Gérez vos rendez-vous et accédez à vos documents médicaux en toute simplicité.</p>
        </div>
        <Link to="/patient/rendez-vous/reservation" className="flex items-center justify-center gap-sm bg-primary text-on-primary px-md py-sm rounded-xl font-label-md hover:bg-on-primary-container transition-all shadow-md active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          Réserver un RDV
        </Link>
      </header>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-[#dcfce7] soft-shadow p-md flex flex-col">
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <h3 className="font-headline-md text-headline-md">Prochains rendez-vous</h3>
              </div>
              <Link to="/patient/rendez-vous" className="text-primary font-label-md hover:underline">Voir tous</Link>
            </div>

            <div className="flex-1 space-y-4">
              {(!rdvs || rdvs.length === 0) ? (
                <div className="p-6 border border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center text-on-surface-variant py-8">
                  <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
                  <p className="font-medium italic">Aucun rendez-vous prévu.</p>
                </div>
              ) : (
                (() => {
                  const sorted = [...rdvs].sort((a,b) => new Date(a.programme) - new Date(b.programme));
                  const displayed = sorted.slice(0,4);
                  return (
                    <div className="space-y-4">
                      {displayed.map((r) => (
                            <div key={r.idRdv || r.id} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-transparent hover:border-[#dfeee6] shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all">
                              <div className="hidden sm:flex flex-col items-center justify-center px-3 bg-gradient-to-br from-primary/5 to-transparent rounded-md p-2">
                                <div className="text-primary font-semibold text-lg">{new Date(r.programme).getDate()}</div>
                                <div className="text-sm text-on-surface-variant uppercase">{new Date(r.programme).toLocaleString('fr-FR', { month: 'short' })}</div>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                  <div>
                                    <h4 className="font-semibold text-primary text-lg">{r.objet || 'Rendez-vous'}</h4>
                                    <div className="text-sm text-on-surface-variant mt-1">ID: {r.idRdv || r.id}</div>
                                  </div>
                                  <div className="mt-2 md:mt-0 text-sm text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                      <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                                      <span>{new Date(r.programme).toLocaleDateString('fr-FR')} · {new Date(r.programme).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="material-symbols-outlined text-primary text-[18px]">medical_services</span>
                                      <span>Avec: <span className="font-medium">{r.personnelNom || r.personnel || '—'}</span></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  );
                })()
              )}
            </div>
          </section>

          <section className="lg:col-span-5 bg-surface-container-lowest rounded-xl border border-[#dcfce7] soft-shadow p-md flex flex-col">
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <h3 className="font-headline-md text-headline-md">Consultations récentes</h3>
              </div>
              <Link to="/patient/consultations" className="text-primary font-label-md hover:underline">Voir tous</Link>
            </div>

            <div className="space-y-3">
              {(!consultations || consultations.length === 0) ? (
                <p className="text-sm text-on-surface-variant">Aucune consultation trouvée.</p>
              ) : (
                (() => {
                  const sorted = [...consultations].sort((a,b) => {
                    const ad = new Date(a.date || a.dateConsultation || a.createdAt || 0);
                    const bd = new Date(b.date || b.dateConsultation || b.createdAt || 0);
                    return bd - ad;
                  });
                  const displayed = sorted.slice(0,4);
                  return displayed.map((c) => (
                    <div key={c.id || c.idConsultation} className="flex items-center justify-between p-3 hover:bg-surface-container transition-colors rounded-lg group">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant">description</span>
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{c.objet || c.titre || 'Consultation'}</p>
                          <div className="text-sm text-on-surface-variant mt-1">ID: #C-{c.id || c.idConsultation}</div>
                          <p className="text-sm text-on-surface-variant">{(c.date || c.dateConsultation) ? new Date(c.date || c.dateConsultation).toLocaleDateString('fr-FR') : ''}</p>
                        </div>
                      </div>
                      <Link to={`/patient/consultations/Details?id=${c.id || c.idConsultation}`} className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-lg font-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">Voir</Link>
                    </div>
                  ));
                })()
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
