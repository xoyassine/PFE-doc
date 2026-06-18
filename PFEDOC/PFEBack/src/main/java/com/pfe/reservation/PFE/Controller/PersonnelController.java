package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.PersonnelDTO;
import com.pfe.reservation.PFE.Service.PersonnelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personnel")
public class PersonnelController {

    private final PersonnelService personnelService;

    public PersonnelController(PersonnelService personnelService) {
        this.personnelService = personnelService;
    }

    @GetMapping
    public ResponseEntity<List<PersonnelDTO.Output>> getAll() {
        return ResponseEntity.ok(personnelService.getAllPersonnel());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonnelDTO.Output> getById(@PathVariable Long id) {
        return ResponseEntity.ok(personnelService.getPersonnelById(id));
    }

    @PostMapping
    public ResponseEntity<PersonnelDTO.Output> create(
            @Valid @RequestBody PersonnelDTO.CreateInput input) {
        PersonnelDTO.Output created = personnelService.createPersonnel(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonnelDTO.Output> update(
            @PathVariable Long id,
            @Valid @RequestBody PersonnelDTO.UpdateInput input) {
        return ResponseEntity.ok(personnelService.updatePersonnel(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personnelService.deletePersonnel(id);
        return ResponseEntity.noContent().build();
    }
}