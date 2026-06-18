package com.pfe.reservation.PFE.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
public class PersonnelDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateInput {
        @NotBlank(message = "Le nom est obligatoire")
        private String nom;

        @NotBlank(message = "Le prénom est obligatoire")
        private String prenom;

        @NotBlank(message = "L'email est obligatoire")
        @Email(message = "L'email doit être valide")
        private String email;

        @NotBlank(message = "Le titre est obligatoire")
        private String titre;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateInput {
        @NotBlank(message = "Le nom est obligatoire pour la mise à jour")
        private String nom;

        @NotBlank(message = "Le prénom est obligatoire pour la mise à jour")
        private String prenom;

        @NotBlank(message = "L'email est obligatoire pour la mise à jour")
        @Email(message = "L'email doit être valide")
        private String email;

        @NotBlank(message = "Le titre est obligatoire pour la mise à jour")
        private String titre;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Output {
        private Long idPer;
        private String nom;
        private String prenom;
        private String email;
        private String titre;
    }
}