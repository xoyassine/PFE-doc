import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ordonnanceService from '../../../Services/OrdonnanceService';
import { FileText, Search } from 'lucide-react';

const OrdonnanceList = () => {
  const [ordonnances, setOrdonnances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdonnances = async () => {
      try {
        const data = await ordonnanceService.getAll();
        setOrdonnances(data);
      } catch (err) {
        setError('Impossible de charger les ordonnances.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrdonnances();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette ordonnance ?')) {
      try {
        await ordonnanceService.delete(id);
        setOrdonnances(ordonnances.filter(o => o.idOrdonnance !== id));
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger container mt-4">{error}</div>;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 mt-4">
        <div>
          <h2 className="text-2xl font-semibold"><FileText className="inline -mt-[2px] mr-2" size={20} />Liste des ordonnances</h2>
          <p className="text-sm text-on-surface-variant">Édition et gestion des prescriptions.</p>
        </div>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou prénom..."
              className="pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-sm w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow level-1 border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-4 text-sm text-on-surface-variant">ID</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Date</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Nom</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Prénom</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Prescriptions</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Consultation</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {ordonnances.filter(ordo => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (ordo.nom || '').toLowerCase().includes(term) || (ordo.prenom || '').toLowerCase().includes(term);
              }).map(ordo => (
                <tr key={ordo.idOrdonnance} className="hover:bg-surface-container-lowest group transition-colors">
                  <td className="py-3 px-4 text-sm text-on-surface-variant">{ordo.idOrdonnance}</td>
                  <td className="py-3 px-4">{ordo.date}</td>
                  <td className="py-3 px-4 font-medium">{ordo.nom}</td>
                  <td className="py-3 px-4">{ordo.prenom}</td>
                  <td className="py-3 px-4">{ordo.prescriptions}</td>
                  <td className="py-3 px-4">{ordo.consultationId}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:lg:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-surface-container-low rounded-full" onClick={() => navigate(`/personnel/ordonnances/modifier/${ordo.idOrdonnance}`)} title="Modifier">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-surface-container-low rounded-full" onClick={() => handleDelete(ordo.idOrdonnance)} title="Supprimer">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {ordonnances.filter(ordo => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (ordo.nom || '').toLowerCase().includes(term) || (ordo.prenom || '').toLowerCase().includes(term);
              }).length === 0 && (
                <tr><td colSpan="7" className="py-4 px-4 text-center text-on-surface-variant">Aucune ordonnance trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdonnanceList;