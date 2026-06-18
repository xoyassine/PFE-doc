package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.ConsultationDTO;
import com.pfe.reservation.PFE.Exception.ElementIntouvable;
import com.pfe.reservation.PFE.Exception.ElementNull;
import com.pfe.reservation.PFE.Mapper.ConsultationMapper;
import com.pfe.reservation.PFE.Model.Consultation;
import com.pfe.reservation.PFE.Repository.ConsultationRepository;
import com.pfe.reservation.PFE.Repository.PatientRepository;
import com.pfe.reservation.PFE.Repository.PersonnelRepository;
import com.pfe.reservation.PFE.Service.ConsultationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final PatientRepository patientRepository;
    private final PersonnelRepository personnelRepository;
    private final ConsultationMapper consultationMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ConsultationDTO.Output> getAllConsultations() {
        return consultationRepository.findAll()
                .stream()
                .map(consultationMapper::toOutput)
                .collect(Collectors.toList()) ;
    }

    @Override
    @Transactional(readOnly = true)
    public ConsultationDTO.Output getConsultationById(Long id) {
        if (id == null) throw new ElementNull("id is null");
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Consultation not found with id: " + id));
        return consultationMapper.toOutput(consultation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsultationDTO.Output> getConsultationsByPatientId(Long patientId) {
        if (patientId == null) throw new ElementNull("patientId is null");
        return consultationRepository.findByPatient_IdPatient(patientId)
                .stream()
                .map(consultationMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConsultationDTO.Output> getConsultationsByMedecinId(Long medecinId) {
        if (medecinId == null) throw new ElementNull("medecinId is null");
        return consultationRepository.findByMedecin_IdPer(medecinId)
                .stream()
                .map(consultationMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    public ConsultationDTO.Output createConsultation(ConsultationDTO.CreateInput input) {
        if (input == null) throw new ElementNull("input is null");

        if (!patientRepository.existsById(input.getPatientId())) {
            throw new ElementIntouvable("Patient not found with id: " + input.getPatientId());
        }
        if (!personnelRepository.existsById(input.getMedecinId())) {
            throw new ElementIntouvable("Personnel (medecin) not found with id: " + input.getMedecinId());
        }

        Consultation consultation = consultationMapper.toEntity(input);
        consultation = consultationRepository.save(consultation);
        return consultationMapper.toOutput(consultation);
    }

    @Override
    public ConsultationDTO.Output updateConsultation(Long id, ConsultationDTO.UpdateInput input) {
        if (id == null || input == null) throw new ElementNull("id or input is null");

        Consultation existing = consultationRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Consultation not found with id: " + id));

        if (input.getPatientId() != null && !patientRepository.existsById(input.getPatientId())) {
            throw new ElementIntouvable("Patient not found with id: " + input.getPatientId());
        }
        if (input.getMedecinId() != null && !personnelRepository.existsById(input.getMedecinId())) {
            throw new ElementIntouvable("Personnel (medecin) not found with id: " + input.getMedecinId());
        }

        consultationMapper.updateEntityFromDto(input, existing);
        existing = consultationRepository.save(existing);
        return consultationMapper.toOutput(existing);
    }

    @Override
    public void deleteConsultation(Long id) {
        if (id == null) throw new ElementNull("id is null");
        if (!consultationRepository.existsById(id)) {
            throw new ElementIntouvable("Consultation not found with id: " + id);
        }
        consultationRepository.deleteById(id);
    }
}