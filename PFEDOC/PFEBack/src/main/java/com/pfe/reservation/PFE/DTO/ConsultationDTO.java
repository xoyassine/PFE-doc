package com.pfe.reservation.PFE.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ConsultationDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateInput {
        @NotNull(message = "Consultation date is required")
        private LocalDateTime dateConsultation;

        @NotBlank(message = "Diagnostic is required")
        private String diagnostic;

        @NotNull(message = "Patient ID is required")
        private Long patientId;

        @NotNull(message = "Medecin ID is required")
        private Long medecinId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateInput {
        @NotNull(message = "Consultation date is required")
        private LocalDateTime dateConsultation;

        @NotBlank(message = "Diagnostic is required")
        private String diagnostic;

        private Long patientId;
        private Long medecinId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Output {
        private Long idConsultation;
        private LocalDateTime dateConsultation;
        private String diagnostic;
        private Long patientId;
        private String patientNom;
        private Long medecinId;
        private String medecinNom;
    }

}