import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RendezVousService from '../../../Services/RendezVousService';
import { Mail, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';

const ModifierRdv = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rdv, setRdv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', programme: '', objet: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const data = await RendezVousService.getById(id);
        setRdv(data);
        setFormData({
          email: data.email || '',
          programme: data.programme ? data.programme.slice(0, 16) : '',
          objet: data.objet || ''
        });
      } catch (err) {
        console.error('Erreur chargement RDV', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRdv();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email patient requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.programme) newErrors.programme = 'Date et heure requises';
    if (!formData.objet.trim()) newErrors.objet = 'Objet requis';
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
      await RendezVousService.update(id, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/personnel/rendez-vous');
      }, 1200);
    } catch (err) {
      console.error('Erreur lors de la modification', err);
      setErrors({ global: 'Erreur serveur' });
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (!rdv) return <div className="text-center mt-5">Rendez-vous introuvable.</div>;

  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-xl mt-16">
      <div className="w-full max-w-[600px] bg-surface-container-lowest rounded-xl border border-[#dcfce7] p-md md:p-lg form-shadow animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={18} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Modifier le rendez-vous</h1>
        </div>

        {success && (
          <div className="mb-4 flex items-center gap-3 bg-green-50 text-green-800 p-3 rounded">
            <CheckCircle size={18} />
            <span>Rendez-vous modifié avec succès !</span>
          </div>
        )}

        {errors.global && <div className="mb-4 text-sm text-red-700">{errors.global}</div>}

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-xs">
            <label className="font-label-md text-on-surface-variant block">Email du patient *</label>
            <div className="relative">
              <input
                type="email"
                className="w-full pl-10 pr-4 py-sm bg-surface border border-outline-variant rounded-lg text-body-md placeholder:text-outline focus:ring-0"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="patient@exemple.fr"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                <Mail size={16} />
              </span>
            </div>
            {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-on-surface-variant block">Date et heure *</label>
            <div className="relative">
              <input
                type="datetime-local"
                className="w-full pl-10 pr-4 py-sm bg-surface border border-outline-variant rounded-lg text-body-md focus:ring-0"
                name="programme"
                value={formData.programme}
                onChange={handleChange}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                <Calendar size={16} />
              </span>
            </div>
            {errors.programme && <div className="text-red-600 text-sm">{errors.programme}</div>}
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-on-surface-variant block">Objet *</label>
            <textarea
              className="w-full px-md py-sm bg-surface border border-outline-variant rounded-lg text-body-md placeholder:text-outline focus:ring-0 resize-none"
              name="objet"
              value={formData.objet}
              onChange={handleChange}
              rows="4"
              placeholder="Motif de la consultation..."
            ></textarea>
            {errors.objet && <div className="text-red-600 text-sm">{errors.objet}</div>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-sm pt-sm">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-md py-sm rounded-full font-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-lg py-sm bg-primary text-on-primary rounded-full font-label-md hover:bg-on-primary-container shadow-sm active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Enregistrer
            </button>
          </div>
        </form>

        <div className="mt-lg pt-md border-t border-outline-variant text-center">
          <button onClick={() => navigate('/personnel/rendez-vous')} className="text-primary hover:underline font-label-md inline-flex items-center gap-xs">
            <ArrowLeft size={18} /> Retour à la liste
          </button>
        </div>
      </div>
    </main>
  );
};

export default ModifierRdv;