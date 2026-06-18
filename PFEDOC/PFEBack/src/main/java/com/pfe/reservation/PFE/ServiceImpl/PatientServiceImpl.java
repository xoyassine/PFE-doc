package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.PatientDTO;
import com.pfe.reservation.PFE.Exception.ElementExistant;
import com.pfe.reservation.PFE.Exception.ElementIntouvable;
import com.pfe.reservation.PFE.Exception.ElementNull;
import com.pfe.reservation.PFE.Mapper.PatientMapper;
import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Repository.PatientRepository;
import com.pfe.reservation.PFE.Service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    @Transactional(readOnly = true)
    public List<PatientDTO.Output> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(patientMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PatientDTO.Output getPatientById(Long id) {
        if (id == null) throw new ElementNull("id is null");
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Patient not found"));
        return patientMapper.toOutput(patient);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientDTO.Output getPatientByEmail(String email) {
        if (email == null) throw new ElementNull("email is null");
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new ElementIntouvable("Patient not found with email: " + email));
        return patientMapper.toOutput(patient);
    }

    @Override
    public PatientDTO.Output createPatient(PatientDTO.CreateInput input) {
        if (input == null) throw new ElementNull("Patient input is null");
        if (patientRepository.existsByEmail(input.getEmail())) {
            throw new ElementExistant("Patient already exists with email: " + input.getEmail());
        }
        Patient patient = patientMapper.toEntity(input);
        patient = patientRepository.save(patient);
        return patientMapper.toOutput(patient);
    }

    @Override
    public PatientDTO.Output updatePatient(Long id, PatientDTO.UpdateInput input) {
        if (id == null || input == null) throw new ElementNull("id or input is null");
        Patient existing = patientRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Patient not found with id: " + id));
        patientMapper.updateEntityFromDto(input, existing);
        existing = patientRepository.save(existing);
        return patientMapper.toOutput(existing);
    }

    @Override
    public void deletePatient(Long id) {
        if (id == null) throw new ElementNull("id is null");
        if (!patientRepository.existsById(id)) {
            throw new ElementIntouvable("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }
}