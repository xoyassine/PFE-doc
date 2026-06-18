package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.PatientDTO;
import com.pfe.reservation.PFE.Service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientDTO.Output>> getAll() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO.Output> getById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @GetMapping("/by-email")
    public ResponseEntity<PatientDTO.Output> getByEmail(@RequestParam String email) {
        return ResponseEntity.ok(patientService.getPatientByEmail(email));
    }

    @PostMapping
    public ResponseEntity<PatientDTO.Output> create(@Valid @RequestBody PatientDTO.CreateInput input) {
        PatientDTO.Output created = patientService.createPatient(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO.Output> update(@PathVariable Long id,
                                                    @Valid @RequestBody PatientDTO.UpdateInput input) {
        return ResponseEntity.ok(patientService.updatePatient(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}