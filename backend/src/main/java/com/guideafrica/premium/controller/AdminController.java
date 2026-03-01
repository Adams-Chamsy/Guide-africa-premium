package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(adminService.getStatistiques());
    }

    @GetMapping("/users")
    public ResponseEntity<Page<Utilisateur>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(adminService.getUtilisateurs(pageable));
    }

    @PutMapping("/users/{id}/toggle-active")
    public ResponseEntity<Utilisateur> toggleUserActive(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleUserActive(id));
    }

    @GetMapping("/reviews")
    public ResponseEntity<Page<Review>> getReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(adminService.getAllReviews(pageable));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        adminService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reservations")
    public ResponseEntity<Page<Reservation>> getReservations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(adminService.getAllReservations(pageable));
    }

    @PutMapping("/reservations/{id}/statut")
    public ResponseEntity<Reservation> updateReservationStatut(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        StatutReservation statut = StatutReservation.valueOf(body.get("statut"));
        return ResponseEntity.ok(adminService.updateReservationStatut(id, statut));
    }
}
