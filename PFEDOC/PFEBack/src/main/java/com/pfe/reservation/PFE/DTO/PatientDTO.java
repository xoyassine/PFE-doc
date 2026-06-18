package com.pfe.reservation.PFE.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class PatientDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateInput {
        @NotBlank(message = "Last name is required")
        private String nom;

        @NotBlank(message = "First name is required")
        private String prenom;

        @NotNull(message = "Birth date is required")
        private LocalDate dateNaissance;

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;

        @NotBlank(message = "Address is required")
        private String adresse;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateInput {
        @NotBlank(message = "Last name is required")
        private String nom;

        @NotBlank(message = "First name is required")
        private String prenom;

        @NotNull(message = "Birth date is required")
        private LocalDate dateNaissance;

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;

        @NotBlank(message = "Address is required")
        private String adresse;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Output {
        private Long idPatient;
        private String nom;
        private String prenom;
        private LocalDate dateNaissance;
        private String email;
        private String adresse;
    }
}