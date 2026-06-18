package com.pfe.reservation.PFE.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConsultation;

    private LocalDateTime dateConsultation;

    @Column(length = 1000)
    private String diagnostic;

    // Patient concerne
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // Medecin responsable
    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private Personnel medecin;

    // Une consultation peut avoir plusieurs ordonnances
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL)
    private List<Ordonnance> ordonnances;
}