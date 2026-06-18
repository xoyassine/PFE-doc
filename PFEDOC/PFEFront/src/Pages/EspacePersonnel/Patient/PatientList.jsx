import React, { useState, useEffect } from 'react';
import PatientService from '../../../Services/PatientService';
import { Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await PatientService.getAll();
        setPatients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des patients', error);
      } finally {
        setLoading(false) ;
      }
    };
    fetchPatients();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nom: '', prenom: '', dateNaissance: '', email: '', adresse: '' });

  const resetForm = () => {
    setForm({ nom: '', prenom: '', dateNaissance: '', email: '', adresse: '' });
    setEditingId(null);
  };

  const openAddModal = () => {
    navigate('/personnel/patients/ajout');
  };

  const openEditModal = (patient) => {
    setEditingId(patient.idPatient);
    setForm({
      nom: patient.nom,
      prenom: patient.prenom,
      dateNaissance: patient.dateNaissance,
      email: patient.email,
      adresse: patient.adresse,
    });
    navigate(`/personnel/patients/modifier/${patient.idPatient}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce patient ?')) {
      try {
        await PatientService.delete(id);
        setPatients(patients.filter(p => p.idPatient !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await PatientService.update(editingId, form);
        setPatients(patients.map(p =>
          p.idPatient === editingId ? { ...form, idPatient: editingId } : p
        ));
      } else {
        const newPatient = await PatientService.create(form);
        setPatients([...patients, newPatient]);
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 mt-4">
        <div>
          <h2 className="text-2xl font-semibold"><Users className="inline -mt-[2px] mr-2" size={20} />Liste des patients</h2>
          <p className="text-sm text-on-surface-variant">Gérez vos dossiers patients et ajoutez de nouvelles fiches.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
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
          <button onClick={openAddModal} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-surface-tint transition-colors shadow-md active:scale-95">
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
                <th className="py-3 px-4 text-sm text-on-surface-variant">Nom</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Prénom</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Naissance</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Email</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant">Adresse</th>
                <th className="py-3 px-4 text-sm text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {patients.filter(p => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (p.nom || '').toLowerCase().includes(term) || (p.prenom || '').toLowerCase().includes(term);
              }).map(p => (
                <tr key={p.idPatient} className="hover:bg-surface-container-lowest group transition-colors">
                  <td className="py-3 px-4 text-sm text-on-surface-variant">{p.idPatient}</td>
                  <td className="py-3 px-4 font-medium">{p.nom}</td>
                  <td className="py-3 px-4">{p.prenom}</td>
                  <td className="py-3 px-4">{p.dateNaissance}</td>
                  <td className="py-3 px-4 text-on-surface-variant">{p.email}</td>
                  <td className="py-3 px-4 truncate max-w-[200px] text-on-surface-variant">{p.adresse}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-surface-container-low rounded-full" onClick={() => openEditModal(p)} title="Modifier">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-surface-container-low rounded-full" onClick={() => handleDelete(p.idPatient)} title="Supprimer">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {patients.filter(p => {
                const term = search.trim().toLowerCase();
                if (!term) return true;
                return (p.nom || '').toLowerCase().includes(term) || (p.prenom || '').toLowerCase().includes(term);
              }).length === 0 && (
                <tr><td colSpan="7" className="py-4 px-4 text-center text-on-surface-variant">Aucun patient trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;