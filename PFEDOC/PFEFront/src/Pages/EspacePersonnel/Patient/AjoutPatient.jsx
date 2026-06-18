import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientService from '../../../Services/PatientService';
// Removed 'Calendar' from imports as we are relying on the native date picker icon
import { UserPlus, User as UserIcon, Mail, MapPin, ArrowLeft } from 'lucide-react';

const AjoutPatient = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    adresse: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
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
      const response = await PatientService.create(formData);
      console.log('Patient ajouté :', formData); 
      setSuccess(true);
      setFormData({ nom: '', prenom: '', dateNaissance: '', email: '', adresse: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout', error);
    }
  };

  return (

      <main className="flex-grow flex items-start justify-center pt-1 md:pt-2 px-6 md:px-12">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-md border border-surface-container-highest p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus size={20} />
            </div>
            <h1 className="text-3xl font-bold text-on-surface">Ajouter un patient</h1>
            <p className="text-on-surface-variant text-sm mt-2">Remplissez les informations ci-dessous pour créer un nouveau dossier patient.</p>
          </div>

          {success && <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">Patient ajouté avec succès !</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Nom <span className="text-error">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><UserIcon size={16} /></span>
                {/* Changed px-4 pl-10 to pr-4 pl-10 */}
                <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" id="nom" name="nom" placeholder="Ex: Dupont" value={formData.nom} onChange={handleChange} />
              </div>
              {errors.nom && <p className="text-sm text-red-600 mt-1">{errors.nom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Prénom <span className="text-error">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><UserIcon size={16} /></span>
                {/* Changed px-4 pl-10 to pr-4 pl-10 */}
                <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" id="prenom" name="prenom" placeholder="Ex: Jean" value={formData.prenom} onChange={handleChange} />
              </div>
              {errors.prenom && <p className="text-sm text-red-600 mt-1">{errors.prenom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Date de naissance <span className="text-error">*</span></label>
              <div className="relative">
                {/* Removed custom icon, changed to standard px-4 py-2.5 to let the native icon breathe */}
                <input className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" id="dateNaissance" name="dateNaissance" type="date" value={formData.dateNaissance} onChange={handleChange} />
              </div>
              {errors.dateNaissance && <p className="text-sm text-red-600 mt-1">{errors.dateNaissance}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Email <span className="text-error">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><Mail size={16} /></span>
                {/* Changed px-4 pl-10 to pr-4 pl-10 */}
                <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" id="email" name="email" placeholder="jean.dupont@email.com" type="email" value={formData.email} onChange={handleChange} />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Adresse <span className="text-error">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant"><MapPin size={16} /></span>
                {/* Changed px-4 pl-10 to pr-4 pl-10 */}
                <input className="w-full border border-outline-variant rounded-lg py-2.5 pr-4 pl-10 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary" id="adresse" name="adresse" placeholder="Ex: 123 Rue de la Santé, 75000 Paris" value={formData.adresse} onChange={handleChange} />
              </div>
              {errors.adresse && <p className="text-sm text-red-600 mt-1">{errors.adresse}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="submit" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium transition-colors flex-1">Enregistrer</button>
              <button type="button" onClick={() => setFormData({ nom: '', prenom: '', dateNaissance: '', email: '', adresse: '' })} className="px-6 py-2.5 rounded-lg font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">Réinitialiser</button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link to="/personnel/patients" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> Retour à la liste des patients
            </Link>
          </div>
        </div>
      </main>
  );
};

export default AjoutPatient;