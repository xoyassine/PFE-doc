import api from './api';

const patientService = {
  // GET /patients
  getAll: async () => {
    const response = await api.get('/patients');
    return response.data;
  },

  // GET /patients/{id}
  getById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // GET /patients/by-email?email=...
  getByEmail: async (email) => {
    const response = await api.get('/patients/by-email', { params: { email } });
    return response.data;
  },

  // POST /patients
  create: async (input) => {
    const response = await api.post('/patients', input);
    return response.data;
  },

  // PUT /patients/{id}
  update: async (id, input) => {
    const response = await api.put(`/patients/${id}`, input);
    return response.data;
  },

  // DELETE /patients/{id}
  delete: async (id) => {
    await api.delete(`/patients/${id}`);
  }
};

export default patientService;