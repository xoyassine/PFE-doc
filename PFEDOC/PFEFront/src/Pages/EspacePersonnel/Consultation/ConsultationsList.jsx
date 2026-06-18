import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import consultationService from '../../../Services/ConsultationService';
import { Stethoscope, Search } from 'lucide-react';

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const data = await consultationService.getAllConsultations();
        setConsultations(data);
        setError(null);
      } catch (err) {
        console.error('Erreur chargement consultations', err);
        setError('Impossible de charger la liste des consultations.');
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleString('fr-FR');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette consultation ?')) {
      try {
        await consultationService.deleteConsultation(id);
        setConsultations(consultations.filter(c => c.idConsultation !== id));
      } catch (err) {
        console.error('Erreur suppression', err);
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement des consultations...</div>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 mt-4">
        <div>
          <h2 className="text-2xl font-semibold"><Stethoscope className="inline -mt-[2px] mr-2" size={20} />Liste des consultations</h2>
          <p className="text-sm text-on-surface-variant">Consultez et gérez les comptes rendus cliniques.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par patient, médecin, diagnostic..."
              className="pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          </div>
          <button onClick={() => navigate('/personnel/consultations/ajout')} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-surface-tint transition-colors shadow-md active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Ajouter
          </button>
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="bg-surface rounded-xl shadow level-1 border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-4 text-sm text-on-surface-variant">ID</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Date</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Diagnostic</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Patient</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Médecin</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {consultations.filter(consultation => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (String(consultation.patientNom || '') + ' ' + String(consultation.medecinNom || '') + ' ' + String(consultation.diagnostic || '')).toLowerCase().includes(term);
              }).map(consultation => (
                <tr key={consultation.idConsultation} className="hover:bg-surface-container-lowest group transition-colors">
                  <td className="py-3 px-4 text-sm text-on-surface-variant">{consultation.idConsultation}</td>
                  <td className="py-3 px-4">{formatDateTime(consultation.dateConsultation)}</td>
                  <td className="py-3 px-4">{consultation.diagnostic || '—'}</td>
                  <td className="py-3 px-4">{consultation.patientNom || '—'}</td>
                  <td className="py-3 px-4">{consultation.medecinNom || '—'}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-surface-container-low rounded-full" onClick={() => navigate(`/personnel/ordonnances/ajout/${consultation.idConsultation}`)} title="Ajouter une ordonnance">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                      </button>
                      <button className="p-2 text-primary hover:bg-surface-container-low rounded-full" onClick={() => navigate(`/personnel/consultations/modifier/${consultation.idConsultation}`)} title="Modifier">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-surface-container-low rounded-full" onClick={() => handleDelete(consultation.idConsultation)} title="Supprimer">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {consultations.filter(consultation => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (String(consultation.patientNom || '') + ' ' + String(consultation.medecinNom || '') + ' ' + String(consultation.diagnostic || '')).toLowerCase().includes(term);
              }).length === 0 && (
                <tr><td colSpan="6" className="py-4 px-4 text-center text-on-surface-variant">Aucune consultation trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsList;