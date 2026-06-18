import React, { useEffect, useState } from 'react';
import consultationService from '../../../Services/ConsultationService';
import authService from '../../../Services/AuthService';
import { Link } from 'react-router-dom';

const MesConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const user = authService.getCurrentUser();
        const patientId = user?.id || user?.user?.id;
        const data = await consultationService.getConsultationsByPatientId(patientId);
        setConsultations(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    try {
      const date = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
      const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(d);
      return `${date} • ${time}`;
    } catch (e) {
      return iso;
    }
  };

  const getRef = (c) => c.ref || c.reference || (c.id || c.idConsultation ? `#C-${c.id || c.idConsultation}` : '');
  const getPractitioner = (c) => {
    if (c.medecinNom) return c.medecinNom;
    if (c.medecin && typeof c.medecin === 'string') return c.medecin;
    if (c.medecin && typeof c.medecin === 'object' && (c.medecin.nom || c.medecin.fullName)) return c.medecin.nom || c.medecin.fullName;
    return c.praticien || c.medecin || c.nom || c.practitioner || 'Médecin';
  };
  return (
    <main className="space-y-6 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Mes consultations</h1>
              <p className="text-sm text-on-surface-variant">Consultez l'historique complet de vos visites médicales et accédez à vos comptes-rendus.</p>
            </div>
          </header>

          <div className="space-y-4">
            {loading ? (
              <div>Chargement...</div>
            ) : consultations.length === 0 ? (
              <div className="text-sm text-on-surface-variant">Aucune consultation trouvée.</div>
            ) : (
              <div className="space-y-4" id="consultation-list">
                {consultations.map((c) => (
                  <div key={c.id || c.idConsultation} className="bg-surface rounded-2xl p-5 soft-shadow card-border flex flex-col md:flex-row md:items-center gap-6 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-secondary-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[32px]">medical_services</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-on-surface-variant text-label-sm font-label-sm">Réf: {getRef(c)}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-on-surface-variant text-body-md font-body-md">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                          {formatDate(c.date || c.dateConsultation || c.createdAt)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">person</span>
                          {getPractitioner(c)}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-4 md:mt-0">
                      <Link to={`/patient/consultations/Details?id=${c.id || c.idConsultation}`} className="w-full md:w-auto px-6 py-2.5 bg-surface-container-highest text-primary font-label-md text-label-md rounded-xl hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                        Voir les détails
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MesConsultations;