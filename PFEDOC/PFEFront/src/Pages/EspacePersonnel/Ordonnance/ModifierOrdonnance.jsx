import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ordonnanceService from '../../../Services/OrdonnanceService';

const ModifierOrdonnance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: '',
    nom: '',
    prenom: '',
    prescriptions: '',
    consultationId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchOrdonnance = async () => {
      try {
        const data = await ordonnanceService.getById(id);
        setForm({
          date: data.date || '',
          nom: data.nom || '',
          prenom: data.prenom || '',
          prescriptions: data.prescriptions || '',
          consultationId: data.consultationId?.toString() || ''
        });
      } catch (err) {
        setError('Impossible de charger cette ordonnance.');
      } finally {
        setFetching(false);
      }
    };
    fetchOrdonnance();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.date || !form.nom || !form.prenom || !form.prescriptions) {
      setError('Tous les champs obligatoires doivent être remplis.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...form,
        consultationId: form.consultationId ? parseInt(form.consultationId) : null
      };
      await ordonnanceService.update(id, payload);
      navigate('/personnel/ordonnances');
    } catch (err) {
      setError("Erreur lors de la modification.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-4">✏️ Modifier l'ordonnance #{id}</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-control" name="date"
                    value={form.date} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nom du patient *</label>
                  <input type="text" className="form-control" name="nom"
                    value={form.nom} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Prénom du patient *</label>
                  <input type="text" className="form-control" name="prenom"
                    value={form.prenom} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Prescriptions *</label>
                  <textarea className="form-control" name="prescriptions" rows="3"
                    value={form.prescriptions} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">ID Consultation</label>
                  <input type="number" className="form-control" name="consultationId"
                    value={form.consultationId} onChange={handleChange} />
                  <small className="text-muted">Facultatif</small>
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/personnel/ordonnances" className="btn btn-secondary">Annuler</Link>
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

export default ModifierOrdonnance;