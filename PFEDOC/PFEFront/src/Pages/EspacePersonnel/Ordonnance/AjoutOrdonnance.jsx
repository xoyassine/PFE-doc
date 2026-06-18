import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ordonnanceService from '../../../Services/OrdonnanceService';
import consultationService from '../../../Services/ConsultationService';
import patientService from '../../../Services/PatientService';
import authService from '../../../Services/AuthService';

const AjoutOrdonnance = () => {
    const navigate = useNavigate();
    const { consultationId } = useParams();          // Récupère l'ID dans l'URL
    const user = authService.getCurrentUser();

    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0], // date du jour par défaut
        nom: '',
        prenom: '',
        prescriptions: '',
        consultationId: consultationId || ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingConsultation, setLoadingConsultation] = useState(!!consultationId);

    // Charger les infos de la consultation si un ID est passé
    useEffect(() => {
        if (!consultationId) return;

        const fetchConsultation = async () => {
            try {
                const consultation = await consultationService.getConsultationById(consultationId);
                // Récupérer les infos patient séparées via l'API patient
                const patient = await patientService.getById(consultation.patientId);
                setForm({
                    date: consultation.dateConsultation?.split('T')[0] || form.date,
                    nom: patient.nom || '',
                    prenom: patient.prenom || '',
                    prescriptions: '',
                    consultationId: consultationId.toString()
                });
            } catch (err) {
                console.error('Erreur chargement consultation:', err);
                setError('Impossible de charger les données de la consultation. Veuillez remplir manuellement.');
            } finally {
                setLoadingConsultation(false);
            }
        };
        fetchConsultation();
    }, [consultationId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!form.date || !form.nom || !form.prenom || !form.prescriptions) {
            setError('Tous les champs sont obligatoires.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                date: form.date,
                nom: form.nom,
                prenom: form.prenom,
                prescriptions: form.prescriptions,
                consultationId: parseInt(form.consultationId, 10)
            };
            await ordonnanceService.create(payload);
            navigate('/personnel/ordonnances');
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'ajout de l'ordonnance.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingConsultation) {
        return <div className="text-center mt-5">Chargement des données...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title mb-4">
                                {consultationId ? '📝 Ordonnance liée à la consultation' : '➕ Nouvelle ordonnance'}
                            </h3>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Date de l'ordonnance *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nom du patient *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nom"
                                        value={form.nom}
                                        onChange={handleChange}
                                        disabled
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Prénom du patient *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="prenom"
                                        value={form.prenom}
                                        onChange={handleChange}
                                        disabled
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Prescriptions *</label>
                                    <textarea
                                        className="form-control"
                                        name="prescriptions"
                                        rows="4"
                                        value={form.prescriptions}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {consultationId && (
                                    <div className="mb-3">
                                        <label className="form-label">ID Consultation (liée)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.consultationId}
                                            disabled
                                        />
                                        <small className="text-muted">
                                            Cette ordonnance sera automatiquement associée à la consultation.
                                        </small>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <Link to="/personnel/ordonnances" className="btn btn-secondary">
                                        Annuler
                                    </Link>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjoutOrdonnance;