import api from './api';

const ordonnanceService = {
  // GET /api/ordonnances
  getAll: async () => {
    const response = await api.get('/ordonnances');
    return response.data;
  },

  // GET /api/ordonnances/{id}
  getById: async (id) => {
    const response = await api.get(`/ordonnances/${id}`);
    return response.data;
  },

  // GET /api/ordonnances/consultation/{consultationId}
  getByConsultation: async (consultationId) => {
    const response = await api.get(`/ordonnances/consultation/${consultationId}`);
    return response.data;
  },

  // POST /api/ordonnances
  create: async (input) => {
    const response = await api.post('/ordonnances', input);
    return response.data;
  },

  // PUT /api/ordonnances/{id}
  update: async (id, input) => {
    const response = await api.put(`/ordonnances/${id}`, input);
    return response.data;
  },

  // DELETE /api/ordonnances/{id}
  delete: async (id) => {
    await api.delete(`/ordonnances/${id}`);
  }
};

export default ordonnanceService;