import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rendezVousService from '../../../Services/RendezVousService';
import { Calendar, Search } from 'lucide-react';

const RendezVousList = () => {
  const [rendezvous, setRendezvous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadRendezvous();
  }, []);

  const loadRendezvous = async () => {
    try {
      const data = await rendezVousService.getAll();
      setRendezvous(data);
    } catch (err) {
      console.error('Erreur chargement', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Annuler ce rendez-vous ?')) {
      try {
        await rendezVousService.delete(id);
        setRendezvous(rendezvous.filter(r => r.idRdv !== id));
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 mt-4">
        <div>
          <h2 className="text-2xl font-semibold"><Calendar className="inline -mt-[2px] mr-2" size={20} />Liste des rendez-vous</h2>
          <p className="text-sm text-on-surface-variant">Planifiez et gérez les rendez-vous du cabinet.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher (email, objet, patient)..."
              className="pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          </div>
          <button onClick={() => navigate('/personnel/rendez-vous/ajout')} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-surface-tint transition-colors shadow-md active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Ajouter
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow level-1 border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-4 text-sm text-on-surface-variant">ID</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Email</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Date & Heure</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Statut</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Objet</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Patient ID</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Personnel ID</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {rendezvous.filter(rdv => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (String(rdv.email || '') + ' ' + String(rdv.objet || '') + ' ' + String(rdv.patientId || '')).toLowerCase().includes(term);
              }).map(rdv => (
                <tr key={rdv.idRdv} className="hover:bg-surface-container-lowest group transition-colors">
                  <td className="py-3 px-4 text-sm text-on-surface-variant">{rdv.idRdv}</td>
                  <td className="py-3 px-4">{rdv.email}</td>
                  <td className="py-3 px-4">{new Date(rdv.programme).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {new Date(rdv.programme) < new Date() ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700">Passé</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700">À venir</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{rdv.objet}</td>
                  <td className="py-3 px-4">{rdv.patientId}</td>
                  <td className="py-3 px-4">{rdv.personnelId}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-surface-container-low rounded-full" onClick={() => navigate(`/personnel/rendez-vous/modifier/${rdv.idRdv}`)} title="Modifier">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-surface-container-low rounded-full" onClick={() => handleDelete(rdv.idRdv)} title="Annuler">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rendezvous.filter(rdv => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (String(rdv.email || '') + ' ' + String(rdv.objet || '') + ' ' + String(rdv.patientId || '')).toLowerCase().includes(term);
              }).length === 0 && (
                <tr><td colSpan="7" className="py-4 px-4 text-center text-on-surface-variant">Aucun rendez-vous trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RendezVousList;