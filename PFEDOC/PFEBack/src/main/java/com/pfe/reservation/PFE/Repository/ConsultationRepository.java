package com.pfe.reservation.PFE.Repository;

import com.pfe.reservation.PFE.Model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPatient_IdPatient(Long patientId);
    List<Consultation> findByMedecin_IdPer(Long medecinId) ;
}