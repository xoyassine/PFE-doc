package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.RendezVousDTO;
import com.pfe.reservation.PFE.Service.RendezVousService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rendezvous")
@RequiredArgsConstructor
public class RendezVousController {

    private final RendezVousService rendezVousService;

    @GetMapping
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<List<RendezVousDTO.Output>> getAll() {
        return ResponseEntity.ok(rendezVousService.getAllRendezVous());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<RendezVousDTO.Output> getById(@PathVariable Long id) {
        return ResponseEntity.ok(rendezVousService.getRendezVousById(id));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<List<RendezVousDTO.Output>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByPatientId(patientId));
    }

    @GetMapping("/personnel/{personnelId}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<List<RendezVousDTO.Output>> getByPersonnel(@PathVariable Long personnelId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByPersonnelId(personnelId));
    }

    @PostMapping
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<RendezVousDTO.Output> create(@Valid @RequestBody RendezVousDTO.CreateInput input) {
        RendezVousDTO.Output created = rendezVousService.createRendezVous(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<RendezVousDTO.Output> update(@PathVariable Long id,
                                                       @Valid @RequestBody RendezVousDTO.UpdateInput input) {
        return ResponseEntity.ok(rendezVousService.updateRendezVous(id, input));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PERSONNEL')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rendezVousService.deleteRendezVous(id);
        return ResponseEntity.noContent().build();
    }
}