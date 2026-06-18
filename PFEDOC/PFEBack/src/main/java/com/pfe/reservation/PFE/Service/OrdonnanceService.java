package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.OrdonnanceDTO;
import java.util.List;

public interface OrdonnanceService {
    List<OrdonnanceDTO.Output> getAllOrdonnances();
    OrdonnanceDTO.Output getOrdonnanceById(Long id);
    List<OrdonnanceDTO.Output> getOrdonnancesByConsultationId(Long consultationId);
    OrdonnanceDTO.Output createOrdonnance(OrdonnanceDTO.CreateInput input);
    OrdonnanceDTO.Output updateOrdonnance(Long id, OrdonnanceDTO.UpdateInput input);
    void deleteOrdonnance(Long id);
}