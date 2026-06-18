package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.ConsultationDTO;
import com.pfe.reservation.PFE.Service.ConsultationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    @GetMapping
    @PreAuthorize("hasAnyRole('PERSONNEL', 'PATIENT')")
    public ResponseEntity<List<ConsultationDTO.Output>> getAll() {
        return ResponseEntity.ok(consultationService.getAllConsultations());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'PATIENT')")
    public ResponseEntity<ConsultationDTO.Output> getById(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.getConsultationById(id));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PATIENT') or (hasRole('PERSONNEL') and #patientId == authentication.principal.id)")
    public ResponseEntity<List<ConsultationDTO.Output>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(consultationService.getConsultationsByPatientId(patientId));
    }

    @GetMapping("/medecin/{medecinId}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<List<ConsultationDTO.Output>> getByMedecin(@PathVariable Long medecinId) {
        return ResponseEntity.ok(consultationService.getConsultationsByMedecinId(medecinId));
    }

    @PostMapping
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<ConsultationDTO.Output> create(@Valid @RequestBody ConsultationDTO.CreateInput input) {
        ConsultationDTO.Output created = consultationService.createConsultation(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<ConsultationDTO.Output> update(@PathVariable Long id,
                                                         @Valid @RequestBody ConsultationDTO.UpdateInput input) {
        return ResponseEntity.ok(consultationService.updateConsultation(id, input));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        consultationService.deleteConsultation(id);
        return ResponseEntity.noContent().build();
    }
}