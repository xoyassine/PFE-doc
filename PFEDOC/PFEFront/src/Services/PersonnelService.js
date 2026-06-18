import api from './api';

const personnelService = {
  // GET /personnel
  getAll: async () => {
    const response = await api.get('/personnel');
    return response.data;
  },

  // GET /personnel/{id}
  getById: async (id) => {
    const response = await api.get(`/personnel/${id}`);
    return response.data;
  },

  // POST /personnel
  create: async (input) => {
    const response = await api.post('/personnel', input);
    return response.data;
  },

  // PUT /personnel/{id}
  update: async (id, input) => {
    const response = await api.put(`/personnel/${id}`, input);
    return response.data;
  },

  // DELETE /personnel/{id}
  delete: async (id) => {
    await api.delete(`/personnel/${id}`);
  }
};

export default personnelService;