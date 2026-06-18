package com.pfe.reservation.PFE.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class RendezVousDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateInput {
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;

        @NotNull(message = "Programme date is required")
        private LocalDateTime programme;

        @NotBlank(message = "Subject is required")
        private String objet;

        @NotNull(message = "Patient ID is required")
        private Long patientId;

        @NotNull(message = "Personnel ID is required")
        private Long personnelId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateInput {
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;

        @NotNull(message = "Programme date is required")
        private LocalDateTime programme;

        @NotBlank(message = "Subject is required")
        private String objet;

        private Long patientId;
        private Long personnelId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Output {
        private Long idRdv;
        private String email;
        private LocalDateTime programme;
        private String objet;
        private Long patientId;
        private String patientNom;   // optional, for display
        private Long personnelId;
        private String personnelNom; // optional
    }
}