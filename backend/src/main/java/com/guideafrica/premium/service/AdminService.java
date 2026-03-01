package com.guideafrica.premium.service;

import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.ReservationRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.ReviewRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    private static final Logger log = LoggerFactory.getLogger(AdminService.class);

    private final UtilisateurRepository utilisateurRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;

    public AdminService(UtilisateurRepository utilisateurRepository,
                        RestaurantRepository restaurantRepository,
                        HotelRepository hotelRepository,
                        ReviewRepository reviewRepository,
                        ReservationRepository reservationRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
    }

    public Map<String, Object> getStatistiques() {
        log.info("R\u00e9cup\u00e9ration des statistiques admin");
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUtilisateurs", utilisateurRepository.count());
        stats.put("totalRestaurants", restaurantRepository.count());
        stats.put("totalHotels", hotelRepository.count());
        stats.put("totalAvis", reviewRepository.count());
        stats.put("totalReservations", reservationRepository.count());
        stats.put("reservationsEnAttente", reservationRepository.countByStatut(StatutReservation.EN_ATTENTE));
        stats.put("reservationsConfirmees", reservationRepository.countByStatut(StatutReservation.CONFIRMEE));
        stats.put("utilisateursActifs", utilisateurRepository.countByActif(true));
        return stats;
    }

    public Page<Utilisateur> getUtilisateurs(Pageable pageable) {
        log.info("R\u00e9cup\u00e9ration de la liste des utilisateurs (page {})", pageable.getPageNumber());
        return utilisateurRepository.findAll(pageable);
    }

    public Utilisateur toggleUserActive(Long userId) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'id: " + userId));
        utilisateur.setActif(!utilisateur.isActif());
        log.info("Utilisateur {} ({}) - actif bascul\u00e9 \u00e0 {}", utilisateur.getEmail(), userId, utilisateur.isActif());
        return utilisateurRepository.save(utilisateur);
    }

    public Page<Review> getAllReviews(Pageable pageable) {
        log.info("R\u00e9cup\u00e9ration de tous les avis (page {})", pageable.getPageNumber());
        return reviewRepository.findAll(pageable);
    }

    public void deleteReview(Long reviewId) {
        log.info("Suppression de l'avis {}", reviewId);
        reviewRepository.deleteById(reviewId);
    }

    public Page<Reservation> getAllReservations(Pageable pageable) {
        log.info("Récupération de toutes les réservations (page {})", pageable.getPageNumber());
        return reservationRepository.findAll(pageable);
    }

    public Reservation updateReservationStatut(Long reservationId, StatutReservation statut) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("R\u00e9servation introuvable avec l'id: " + reservationId));
        reservation.setStatut(statut);
        log.info("R\u00e9servation {} - statut mis \u00e0 jour: {}", reservationId, statut);
        return reservationRepository.save(reservation);
    }
}
