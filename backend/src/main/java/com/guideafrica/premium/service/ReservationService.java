package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.ReservationRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.model.enums.TypeNotification;
import com.guideafrica.premium.model.enums.TypeReservation;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.ReservationRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    public ReservationService(ReservationRepository reservationRepository,
                              UtilisateurRepository utilisateurRepository,
                              RestaurantRepository restaurantRepository,
                              HotelRepository hotelRepository,
                              EmailService emailService,
                              NotificationService notificationService) {
        this.reservationRepository = reservationRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    @Transactional
    public Reservation creerReservation(Long userId, ReservationRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        Reservation reservation = new Reservation();
        reservation.setUtilisateur(utilisateur);
        reservation.setTypeReservation(request.getTypeReservation());
        reservation.setTargetId(request.getTargetId());
        reservation.setDateReservation(request.getDateReservation());
        reservation.setHeureReservation(request.getHeureReservation());
        reservation.setDateCheckIn(request.getDateCheckIn());
        reservation.setDateCheckOut(request.getDateCheckOut());
        reservation.setNombrePersonnes(request.getNombrePersonnes());
        reservation.setNombreChambres(request.getNombreChambres());
        reservation.setNotesSpeciales(request.getNotesSpeciales());
        reservation.setTelephone(request.getTelephone());
        reservation.setEmail(request.getEmail());

        reservation = reservationRepository.save(reservation);
        enrichReservation(reservation);

        // Envoyer email de confirmation
        String dateStr = request.getTypeReservation() == TypeReservation.RESTAURANT
                ? (request.getDateReservation() != null ? request.getDateReservation().toString() : "")
                : (request.getDateCheckIn() != null ? request.getDateCheckIn().toString() : "");

        String emailDestinataire = request.getEmail() != null ? request.getEmail() : utilisateur.getEmail();
        emailService.envoyerConfirmationReservation(
                emailDestinataire,
                reservation.getNomEtablissement() != null ? reservation.getNomEtablissement() : "Établissement",
                dateStr
        );

        notificationService.creer(
                userId,
                "Nouvelle réservation",
                "Votre réservation pour " + (reservation.getNomEtablissement() != null ? reservation.getNomEtablissement() : "un établissement") + " a été enregistrée.",
                TypeNotification.RESERVATION,
                "/mes-reservations"
        );

        return reservation;
    }

    public List<Reservation> getReservations(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUtilisateurIdOrderByCreatedAtDesc(userId);
        for (Reservation reservation : reservations) {
            enrichReservation(reservation);
        }
        return reservations;
    }

    public Reservation getReservationById(Long userId, Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Réservation introuvable"));
        if (!reservation.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Réservation introuvable");
        }
        enrichReservation(reservation);
        return reservation;
    }

    @Transactional
    public Reservation annulerReservation(Long userId, Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Réservation introuvable"));
        if (!reservation.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Réservation introuvable");
        }
        if (reservation.getStatut() != StatutReservation.EN_ATTENTE) {
            throw new IllegalStateException("Seules les réservations en attente peuvent être annulées");
        }
        reservation.setStatut(StatutReservation.ANNULEE);
        reservation = reservationRepository.save(reservation);
        enrichReservation(reservation);
        return reservation;
    }

    public Page<Reservation> getAllReservations(Pageable pageable) {
        return reservationRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Transactional
    public Reservation updateStatut(Long id, StatutReservation statut) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Réservation introuvable"));
        reservation.setStatut(statut);
        reservation = reservationRepository.save(reservation);
        enrichReservation(reservation);

        // Notifier l'utilisateur du changement de statut
        String emailDestinataire = reservation.getEmail() != null
                ? reservation.getEmail()
                : reservation.getUtilisateur().getEmail();
        emailService.envoyerChangementStatutReservation(
                emailDestinataire,
                reservation.getNomEtablissement() != null ? reservation.getNomEtablissement() : "Établissement",
                statut.name()
        );

        notificationService.creer(
                reservation.getUtilisateur().getId(),
                "Réservation " + statut.name().toLowerCase().replace('_', ' '),
                "Votre réservation pour " + (reservation.getNomEtablissement() != null ? reservation.getNomEtablissement() : "un établissement") + " a été mise à jour : " + statut.name(),
                TypeNotification.RESERVATION,
                "/mes-reservations"
        );

        return reservation;
    }

    public long countByStatut(StatutReservation statut) {
        return reservationRepository.countByStatut(statut);
    }

    private void enrichReservation(Reservation reservation) {
        if (reservation.getTypeReservation() == TypeReservation.RESTAURANT) {
            restaurantRepository.findById(reservation.getTargetId()).ifPresent(r -> {
                reservation.setNomEtablissement(r.getNom());
                reservation.setImageEtablissement(r.getImage());
                if (r.getVille() != null) {
                    reservation.setVilleEtablissement(r.getVille().getNom());
                }
            });
        } else if (reservation.getTypeReservation() == TypeReservation.HOTEL) {
            hotelRepository.findById(reservation.getTargetId()).ifPresent(h -> {
                reservation.setNomEtablissement(h.getNom());
                reservation.setImageEtablissement(h.getImage());
                if (h.getVille() != null) {
                    reservation.setVilleEtablissement(h.getVille().getNom());
                }
            });
        }
    }
}
