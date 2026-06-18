package com.pfe.reservation.PFE.Repository;

import com.pfe.reservation.PFE.Model.Personnel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel,Long> {

    Optional<Personnel> getByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Personnel> findByEmail(@NotBlank(message = "L'email est obligatoire") @Email(message = "Format d'email invalide") String email);
}
