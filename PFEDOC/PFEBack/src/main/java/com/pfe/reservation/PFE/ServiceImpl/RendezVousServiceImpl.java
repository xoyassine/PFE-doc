package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.RendezVousDTO;
import com.pfe.reservation.PFE.Exception.ElementIntouvable;
import com.pfe.reservation.PFE.Exception.ElementNull;
import com.pfe.reservation.PFE.Mapper.RendezVousMapper;
import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Model.RendezVous;
import com.pfe.reservation.PFE.Repository.PatientRepository;
import com.pfe.reservation.PFE.Repository.PersonnelRepository;
import com.pfe.reservation.PFE.Repository.RendezVousRepository;
import com.pfe.reservation.PFE.Service.RendezVousService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RendezVousServiceImpl implements RendezVousService {

    private final RendezVousRepository rendezVousRepository;
    private final PatientRepository patientRepository;
    private final PersonnelRepository personnelRepository;
    private final RendezVousMapper rendezVousMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RendezVousDTO.Output> getAllRendezVous() {
        return rendezVousRepository.findAll()
                .stream()
                .map(rendezVousMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RendezVousDTO.Output getRendezVousById(Long id) {
        if (id == null) throw new ElementNull("id is null");
        RendezVous rdv = rendezVousRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("RendezVous not found with id: " + id));
        return rendezVousMapper.toOutput(rdv);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RendezVousDTO.Output> getRendezVousByPatientId(Long patientId) {
        if (patientId == null) throw new ElementNull("patientId is null");
        return rendezVousRepository.findByPatient_IdPatient(patientId)
                .stream()
                .map(rendezVousMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RendezVousDTO.Output> getRendezVousByPersonnelId(Long personnelId) {
        if (personnelId == null) throw new ElementNull("personnelId is null");
        return rendezVousRepository.findByPersonnel_IdPer(personnelId)
                .stream()
                .map(rendezVousMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    public RendezVousDTO.Output createRendezVous(RendezVousDTO.CreateInput input) {
        if (input == null) throw new ElementNull("input is null");

        Patient patient = patientRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new ElementIntouvable("Patient not found with email: " + input.getEmail()));

        if (!personnelRepository.existsById(input.getPersonnelId())) {
            throw new ElementIntouvable("Personnel not found with id: " + input.getPersonnelId());
        }

        RendezVous rdv = rendezVousMapper.toEntity(input);
        rdv.setPatient(patient);
        rdv = rendezVousRepository.save(rdv);
        return rendezVousMapper.toOutput(rdv);
    }

    @Override
    public RendezVousDTO.Output updateRendezVous(Long id, RendezVousDTO.UpdateInput input) {
        if (id == null || input == null) throw new ElementNull("id or input is null");

        RendezVous existing = rendezVousRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("RendezVous not found with id: " + id));

        // If patientId or personnelId are provided, verify existence
        if (input.getPatientId() != null && !patientRepository.existsById(input.getPatientId())) {
            throw new ElementIntouvable("Patient not found with id: " + input.getPatientId());
        }
        if (input.getPersonnelId() != null && !personnelRepository.existsById(input.getPersonnelId())) {
            throw new ElementIntouvable("Personnel not found with id: " + input.getPersonnelId());
        }

        rendezVousMapper.updateEntityFromDto(input, existing);
        existing = rendezVousRepository.save(existing);
        return rendezVousMapper.toOutput(existing);
    }

    @Override
    public void deleteRendezVous(Long id) {
        if (id == null) throw new ElementNull("id is null");
        if (!rendezVousRepository.existsById(id)) {
            throw new ElementIntouvable("RendezVous not found with id: " + id);
        }
        rendezVousRepository.deleteById(id);
    }
}