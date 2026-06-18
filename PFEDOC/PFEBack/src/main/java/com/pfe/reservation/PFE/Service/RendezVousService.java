package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.RendezVousDTO;
import java.util.List;

public interface RendezVousService {
    List<RendezVousDTO.Output> getAllRendezVous();
    RendezVousDTO.Output getRendezVousById(Long id);
    List<RendezVousDTO.Output> getRendezVousByPatientId(Long patientId);
    List<RendezVousDTO.Output> getRendezVousByPersonnelId(Long personnelId);
    RendezVousDTO.Output createRendezVous(RendezVousDTO.CreateInput input);
    RendezVousDTO.Output updateRendezVous(Long id, RendezVousDTO.UpdateInput input);
    void deleteRendezVous(Long id);
}