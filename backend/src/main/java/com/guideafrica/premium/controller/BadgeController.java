package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.UserBadge;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.BadgeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/badges")
public class BadgeController {
    private final BadgeService badgeService;
    private final UtilisateurRepository utilisateurRepository;

    public BadgeController(BadgeService badgeService, UtilisateurRepository utilisateurRepository) {
        this.badgeService = badgeService;
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping("/my")
    public ResponseEntity<List<UserBadge>> getMyBadges(Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(badgeService.getUserBadges(user.getId()));
    }

    @PostMapping("/check")
    public ResponseEntity<List<String>> checkBadges(Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(badgeService.checkAndAwardBadges(user.getId()));
    }
}
