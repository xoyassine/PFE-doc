package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.OrdonnanceDTO;
import com.pfe.reservation.PFE.Service.OrdonnanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ordonnances")
@RequiredArgsConstructor
public class OrdonnanceController {

    private final OrdonnanceService ordonnanceService;

    @GetMapping
    public ResponseEntity<List<OrdonnanceDTO.Output>> getAll() {
        return ResponseEntity.ok(ordonnanceService.getAllOrdonnances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO.Output> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ordonnanceService.getOrdonnanceById(id));
    }

    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<List<OrdonnanceDTO.Output>> getByConsultation(@PathVariable Long consultationId) {
        return ResponseEntity.ok(ordonnanceService.getOrdonnancesByConsultationId(consultationId));
    }

    @PostMapping
    public ResponseEntity<OrdonnanceDTO.Output> create(@Valid @RequestBody OrdonnanceDTO.CreateInput input) {
        OrdonnanceDTO.Output created = ordonnanceService.createOrdonnance(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdonnanceDTO.Output> update(@PathVariable Long id,
                                                       @Valid @RequestBody OrdonnanceDTO.UpdateInput input) {
        return ResponseEntity.ok(ordonnanceService.updateOrdonnance(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ordonnanceService.deleteOrdonnance(id);
        return ResponseEntity.noContent().build();
    }
}