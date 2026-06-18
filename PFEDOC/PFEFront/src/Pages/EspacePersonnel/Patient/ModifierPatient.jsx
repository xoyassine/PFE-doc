import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientService from '../../../Services/PatientService';
import { UserPlus, User as UserIcon, Mail, MapPin, ArrowLeft } from 'lucide-react';

const ModifierPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    adresse: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await PatientService.getById(id);
        setFormData({
          nom: patient.nom || '',
          prenom: patient.prenom || '',
          dateNaissance: patient.dateNaissance || '',
          email: patient.email || '',
          adresse: patient.adresse || ''
        });
      } catch (err) {
        console.error('Erreur lors du chargement du patient', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
    if (!formData.dateNaissance) newErrors.dateNaissance = 'Date de naissance requise';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await PatientService.update(id, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/personnel/patients');
      }, 1500);
    } catch (err) {
      console.error('Erreur lors de la modification', err);
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement du patient...</div>;

  return (
    <main className="flex-grow flex items-start justify-center pt-6 md:pt-10 px-6 md:px-12">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-md border border-surface-container-highest p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus size={20} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Modifier le patient</h1>
          <p className="text-on-surface-variant text-sm mt-2">Mettez à jour les informations patient ci-dessous.</p>
        </div>

        {success && <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">Patient modifié avec succès !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Nom <span className="text-error">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><UserIcon size={16} /></span>
              <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" type="text" name="nom" value={formData.nom} onChange={handleChange} />
            </div>
            {errors.nom && <p className="text-sm text-red-600 mt-1">{errors.nom}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Prénom <span className="text-error">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><UserIcon size={16} /></span>
              <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
            </div>
            {errors.prenom && <p className="text-sm text-red-600 mt-1">{errors.prenom}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Date de naissance <span className="text-error">*</span></label>
            <div className="relative">
              <input className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />
            </div>
            {errors.dateNaissance && <p className="text-sm text-red-600 mt-1">{errors.dateNaissance}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Email <span className="text-error">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><Mail size={16} /></span>
              <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Adresse <span className="text-error">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><MapPin size={16} /></span>
              <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </div>
            {errors.adresse && <p className="text-sm text-red-600 mt-1">{errors.adresse}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="submit" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium transition-colors flex-1">Enregistrer les modifications</button>
            <button type="button" className="px-6 py-2.5 rounded-lg font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors" onClick={() => navigate('/personnel/patients')}>Annuler</button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/patients" onClick={(e) => { e.preventDefault(); navigate('/personnel/patients'); }} className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Retour à la liste des patients
          </a>
        </div>
      </div>
    </main>
  );
};

export default ModifierPatient;