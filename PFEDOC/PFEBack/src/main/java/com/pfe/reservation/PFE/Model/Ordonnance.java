package com.pfe.reservation.PFE.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrdonnance;

    private String date;
    private String nom;
    private String prenom;

    @Column(length = 2000)
    private String prescriptions;

    // Consultation
    @ManyToOne
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;
}