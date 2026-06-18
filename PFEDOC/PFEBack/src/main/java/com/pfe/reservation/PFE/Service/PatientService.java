package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.PatientDTO;
import java.util.List;

public interface PatientService {
    List<PatientDTO.Output> getAllPatients();
    PatientDTO.Output getPatientById(Long id);
    PatientDTO.Output getPatientByEmail(String email);
    PatientDTO.Output createPatient(PatientDTO.CreateInput input);
    PatientDTO.Output updatePatient(Long id, PatientDTO.UpdateInput input);
    void deletePatient(Long id);
}