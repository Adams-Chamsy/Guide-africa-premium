package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.model.enums.TypeReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUtilisateurIdOrderByCreatedAtDesc(Long utilisateurId);
    List<Reservation> findByUtilisateurIdAndStatut(Long utilisateurId, StatutReservation statut);
    List<Reservation> findByTypeReservationAndTargetId(TypeReservation type, Long targetId);
    Page<Reservation> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatut(StatutReservation statut);
    long count();
}
