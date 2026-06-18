package com.pfe.reservation.PFE.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class OrdonnanceDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateInput {
        @NotBlank(message = "Date is required")
        private String date;

        @NotBlank(message = "Nom is required")
        private String nom;

        @NotBlank(message = "Prenom is required")
        private String prenom;

        @NotBlank(message = "Prescriptions is required")
        private String prescriptions;

        @NotNull(message = "Consultation ID is required")
        private Long consultationId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateInput {
        @NotBlank(message = "Date is required")
        private String date;

        @NotBlank(message = "Nom is required")
        private String nom;

        @NotBlank(message = "Prenom is required")
        private String prenom;

        @NotBlank(message = "Prescriptions is required")
        private String prescriptions;

        private Long consultationId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Output {
        private Long idOrdonnance;
        private String date;
        private String nom;
        private String prenom;
        private String prescriptions;
        private Long consultationId;
    }
}