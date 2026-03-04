package com.guideafrica.premium.controller;

import com.guideafrica.premium.dto.ReservationRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final UtilisateurRepository utilisateurRepository;

    public ReservationController(ReservationService reservationService,
                                 UtilisateurRepository utilisateurRepository) {
        this.reservationService = reservationService;
        this.utilisateurRepository = utilisateurRepository;
    }

    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        return utilisateur.getId();
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getReservations(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        return ResponseEntity.ok(reservationService.getReservations(userId));
    }

    @PostMapping
    public ResponseEntity<Reservation> creerReservation(
            Authentication authentication,
            @Valid @RequestBody ReservationRequest request) {
        Long userId = getCurrentUserId(authentication);
        Reservation reservation = reservationService.creerReservation(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(
            Authentication authentication,
            @PathVariable Long id) {
        Long userId = getCurrentUserId(authentication);
        return ResponseEntity.ok(reservationService.getReservationById(userId, id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Reservation> annulerReservation(
            Authentication authentication,
            @PathVariable Long id) {
        Long userId = getCurrentUserId(authentication);
        return ResponseEntity.ok(reservationService.annulerReservation(userId, id));
    }
}
