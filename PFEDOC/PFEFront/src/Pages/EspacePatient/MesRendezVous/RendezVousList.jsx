import React, { useEffect, useState } from 'react';
import rendezVousService from '../../../Services/RendezVousService';
import authService from '../../../Services/AuthService';
import { Link } from 'react-router-dom';

const RendezVousList = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const user = authService.getCurrentUser();
        const patientId = user?.id || user?.user?.id;
        const data = await rendezVousService.getByPatient(patientId);
        setRdvs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const fmtDay = (iso) => new Date(iso).getDate();
  const fmtMonth = (iso) => new Date(iso).toLocaleString('fr-FR', { month: 'short' }).toUpperCase();
  const fmtFullDate = (iso) => new Date(iso).toLocaleDateString('fr-FR');
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const sorted = (rdvs || []).slice().sort((a,b) => new Date(a.programme) - new Date(b.programme));
  const displayed = sorted.slice(0,4);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes rendez‑vous</h1>
          <p className="text-sm text-on-surface-variant">Gérez vos consultations médicales à venir et passées.</p>
        </div>
        <Link to="/patient/rendez-vous/reservation" className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          Réserver un RDV
        </Link>
      </header>

      {loading ? (
        <div>Chargement...</div>
      ) : sorted.length === 0 ? (
        <div className="text-sm text-on-surface-variant">Vous n'avez aucun rendez‑vous.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayed.map((r) => (
            <article key={r.idRdv || r.id} className="appointment-card bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 bg-secondary-container text-on-secondary-container rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs font-semibold">{fmtMonth(r.programme)}</span>
                <span className="text-lg font-bold">{fmtDay(r.programme)}</span>
              </div>

              <div className="flex-1">
                <div className="md:flex md:justify-between md:items-start gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-on-surface-variant uppercase">Patient / Motif</div>
                    <div className="text-lg font-semibold text-primary">{r.objet || 'Rendez-vous'}</div>
                    <div className="text-sm text-on-surface-variant">ID: {r.idRdv || r.id}</div>
                  </div>

                  <div className="mt-3 md:mt-0 space-y-1">
                    <div className="text-xs text-on-surface-variant uppercase">Date &amp; Heure</div>
                    <div className="flex items-center gap-2 text-sm text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                      <span>{fmtFullDate(r.programme)}, {fmtTime(r.programme)}</span>
                    </div>
                    <div className="mt-2">
                      {new Date(r.programme) < new Date() ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700">Passé</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700">À venir</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                      <span>Avec: {r.personnelNom || r.personnel || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* actions removed: status, edit and details */}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RendezVousList;