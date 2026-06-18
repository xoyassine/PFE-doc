package com.pfe.reservation.PFE.Repository;

import com.pfe.reservation.PFE.Model.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    // Patient -> idPatient
    List<RendezVous> findByPatient_IdPatient(Long patientId);

    // Personnel -> id_per
    List<RendezVous> findByPersonnel_IdPer(Long personnelId);
}