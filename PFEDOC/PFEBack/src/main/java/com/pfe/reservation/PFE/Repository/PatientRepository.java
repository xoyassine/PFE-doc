package com.pfe.reservation.PFE.Repository;

import com.pfe.reservation.PFE.Model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Patient> getByEmail(String email);
}