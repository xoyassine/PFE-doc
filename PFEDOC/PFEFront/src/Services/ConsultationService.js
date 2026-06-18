import api from './api';

const consultationService = {
  // GET /api/consultations
    getAllConsultations: async () => {
        const response = await api.get('/consultations');
        return response.data;
    },

    // GET /api/consultations/{id}
    getConsultationById: async (id) => {
        const response = await api.get(`/consultations/${id}`);
        return response.data;
    },

    // GET /api/consultations/patient/{patientId}
    getConsultationsByPatientId: async (patientId) => {
        const response = await api.get(`/consultations/patient/${patientId}`);
        return response.data;
    },

    // GET /api/consultations/medecin/{medecinId}
    getConsultationsByMedecinId: async (medecinId) => {
        const response = await api.get(`/consultations/medecin/${medecinId}`);
        return response.data;
    },

    // POST /api/consultations
    createConsultation: async (input) => {
        const response = await api.post('/consultations', input);
        return response.data;
    },

    // PUT /api/consultations/{id}
    updateConsultation: async (id, input) => {
        const response = await api.put(`/consultations/${id}`, input);
        return response.data;
    },

    // DELETE /api/consultations/{id}
    deleteConsultation: async (id) => {
        await api.delete(`/consultations/${id}`);
    }
};

export default consultationService;