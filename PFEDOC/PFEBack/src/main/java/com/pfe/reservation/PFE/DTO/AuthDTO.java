package com.pfe.reservation.PFE.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDTO {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "Le nom est obligatoire")
        private String nom;

        @NotBlank(message = "Le prénom est obligatoire")
        private String prenom;

        @NotBlank(message = "L'email est obligatoire")
        @Email(message = "Format d'email invalide")
        private String email;

        @NotBlank(message = "Le mot de passe est obligatoire")
        private String password;

        @NotBlank(message = "Le rôle est obligatoire")
        private String role;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateInput{
        private String nom;
        private String prenom;
        private String email;
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest{
        @NotBlank(message = "L'email est obligatoire")
        @Email(message = "Format d'email invalide")
        private String email;
        @NotBlank(message = "Le mot de passe est obligatoire")
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginResponse{
        private String token;
        private Long id;
        private String role ;
        private String email;
        private String nom ;
        private String prenom;
    }

}
