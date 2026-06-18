import api from './api';

const rendezVousService = {
  // GET /rendezvous
  getAll: async () => {
    const response = await api.get('/rendezvous');
    return response.data;
  },

  // GET /rendezvous/{id}
  getById: async (id) => {
    const response = await api.get(`/rendezvous/${id}`);
    return response.data;
  },

  // GET /rendezvous/patient/{patientId}
  getByPatient: async (patientId) => {
    const response = await api.get(`/rendezvous/patient/${patientId}`);
    return response.data;
  },

  // GET /rendezvous/personnel/{personnelId}
  getByPersonnel: async (personnelId) => {
    const response = await api.get(`/rendezvous/personnel/${personnelId}`);
    return response.data;
  },

  // POST /rendezvous
  create: async (input) => {
    try {
      const body = { ...input };
      // Preserve plain local datetime strings like "YYYY-MM-DDTHH:MM" or "YYYY-MM-DDTHH:MM:SS"
      if (body.programme) {
        if (typeof body.programme === 'string') {
          const localIsoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
          if (!localIsoRegex.test(body.programme)) {
            // not a plain local datetime string — try to normalize to ISO
            const d = new Date(body.programme);
            if (!Number.isNaN(d.getTime())) body.programme = d.toISOString();
          }
          // if it matches localIsoRegex, leave it as-is to preserve local time (avoid timezone shift)
        } else {
          const d = new Date(body.programme);
          if (!Number.isNaN(d.getTime())) body.programme = d.toISOString();
        }
      }
      const response = await api.post('/rendezvous', body);
      return response.data;
    } catch (err) {
      // attach server message if available
      const serverMsg = err?.response?.data || err?.response?.data?.message;
      console.error('RendezVousService.create error', serverMsg || err.message || err);
      throw err;
    }
  },

  // PUT /rendezvous/{id}
  update: async (id, input) => {
    const response = await api.put(`/rendezvous/${id}`, input);
    return response.data;
  },

  // DELETE /rendezvous/{id}
  delete: async (id) => {
    await api.delete(`/rendezvous/${id}`);
  }
};

export default rendezVousService;