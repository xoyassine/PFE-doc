package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.ConsultationDTO;
import java.util.List;

public interface ConsultationService {
    List<ConsultationDTO.Output> getAllConsultations();
    ConsultationDTO.Output getConsultationById(Long id);
    List<ConsultationDTO.Output> getConsultationsByPatientId(Long patientId);
    List<ConsultationDTO.Output> getConsultationsByMedecinId(Long medecinId);
    ConsultationDTO.Output createConsultation(ConsultationDTO.CreateInput input);
    ConsultationDTO.Output updateConsultation(Long id, ConsultationDTO.UpdateInput input);
    void deleteConsultation(Long id);
}