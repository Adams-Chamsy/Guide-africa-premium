package com.guideafrica.premium.controller;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Notification;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UtilisateurRepository utilisateurRepository;

    public NotificationController(NotificationService notificationService,
                                  UtilisateurRepository utilisateurRepository) {
        this.notificationService = notificationService;
        this.utilisateurRepository = utilisateurRepository;
    }

    private Long getCurrentUserId(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String email = authentication.getName();
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        return utilisateur.getId();
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(notificationService.getNotifications(userId));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        if (userId == null) return ResponseEntity.status(401).build();
        Map<String, Long> response = new HashMap<>();
        response.put("count", notificationService.countNonLues(userId));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id, Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        notificationService.marquerLue(id, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        notificationService.marquerToutesLues(userId);
        return ResponseEntity.ok().build();
    }
}
