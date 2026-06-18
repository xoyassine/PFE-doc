import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import consultationService from '../../../Services/ConsultationService';
import patientService from '../../../Services/PatientService';
import authService from '../../../Services/AuthService';
import { Calendar, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

const AjoutConsultation = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [formData, setFormData] = useState({ dateConsultation: '', diagnostic: '', patientId: '' });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await patientService.getAll();
        setPatients(patientsData);
      } catch (err) {
        console.error('Erreur chargement patients:', err);
        setError('Impossible de charger la liste des patients.');
      }
    };
    fetchPatients();
  }, []);

  if (!user?.role?.includes('PERSONNEL')) return <div className="text-center mt-6 text-red-600">Accès réservé au personnel médical.</div>;
  if (!user?.id) return <div className="text-center mt-6 text-red-600">Utilisateur non authentifié. Veuillez vous reconnecter.</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.dateConsultation || !formData.patientId) {
      setError('Veuillez remplir tous les champs obligatoires (date et patient).');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        dateConsultation: formData.dateConsultation,
        diagnostic: formData.diagnostic,
        patientId: parseInt(formData.patientId, 10),
        medecinId: user.id
      };
      await consultationService.createConsultation(payload);
      setSuccess(true);
      setTimeout(() => navigate('/personnel'), 1200);
    } catch (err) {
      console.error('Erreur ajout consultation:', err);
      setError("Erreur lors de l'ajout de la consultation.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="text-center mt-6">
      <div className="inline-flex items-center gap-3 bg-green-50 text-green-800 p-3 rounded">
        <CheckCircle size={18} />
        <span>Consultation ajoutée avec succès ! Redirection...</span>
      </div>
    </div>
  );

  return (
    <main className="flex-grow flex items-start justify-center pt-1 md:pt-2 px-6 md:px-12">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-md border border-surface-container-highest p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={20} />
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Ajouter une consultation</h1>
          <p className="text-on-surface-variant text-sm mt-2">Remplissez les informations ci-dessous pour créer une nouvelle consultation.</p>
        </div>

        {error && <div className="mb-4 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-on-surface-variant">Date et heure *</label>
            <div className="relative">
              <input
                type="datetime-local"
                name="dateConsultation"
                value={formData.dateConsultation}
                onChange={handleChange}
                required
                className="block w-full border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-on-surface-variant">Diagnostic</label>
            <textarea
              name="diagnostic"
              value={formData.diagnostic}
              onChange={handleChange}
              rows="4"
              placeholder="Résultats, observations..."
              className="block w-full border border-outline-variant rounded-lg py-3 px-4 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-on-surface-variant">Patient *</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="block w-full border border-outline-variant rounded-lg py-3 px-4 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Sélectionner un patient --</option>
              {patients.map((patient) => (
                <option key={patient.idPatient} value={patient.idPatient}>
                  {patient.nom} {patient.prenom}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <p className="text-xs text-on-surface-variant italic">Consultation ajoutée par : {user?.nom} {user?.prenom}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/personnel" className="px-6 py-2.5 rounded-lg font-medium text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container-high transition-colors">Annuler</Link>
            <button type="submit" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/personnel/consultations" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Retour à la liste des consultations
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AjoutConsultation;