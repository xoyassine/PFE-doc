package com.pfe.reservation.PFE.Repository;

import com.pfe.reservation.PFE.Model.Ordonnance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdonnanceRepository extends JpaRepository<Ordonnance, Long> {

    List<Ordonnance> findByConsultation_IdConsultation(Long consultationId);
}