package com.guideafrica.premium.controller;

import com.guideafrica.premium.dto.ChangePasswordRequest;
import com.guideafrica.premium.dto.FavoriRequest;
import com.guideafrica.premium.dto.ProfilUpdateRequest;
import com.guideafrica.premium.dto.VisiteRequest;
import com.guideafrica.premium.exception.AuthentificationException;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Favori;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.Visite;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.FavoriService;
import com.guideafrica.premium.service.VisiteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final FavoriService favoriService;
    private final VisiteService visiteService;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(FavoriService favoriService,
                          VisiteService visiteService,
                          UtilisateurRepository utilisateurRepository,
                          PasswordEncoder passwordEncoder) {
        this.favoriService = favoriService;
        this.visiteService = visiteService;
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private Long getCurrentUserId(Authentication auth) {
        Utilisateur user = utilisateurRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        return user.getId();
    }

    // ===== Favoris =====

    @GetMapping("/favorites")
    public ResponseEntity<List<Favori>> getFavoris(
            Authentication auth,
            @RequestParam(required = false) TypeEtablissement type) {
        Long userId = getCurrentUserId(auth);
        if (type != null) {
            return ResponseEntity.ok(favoriService.getFavorisByType(userId, type));
        }
        return ResponseEntity.ok(favoriService.getFavoris(userId));
    }

    @PostMapping("/favorites")
    public ResponseEntity<Favori> ajouterFavori(
            Authentication auth,
            @Valid @RequestBody FavoriRequest request) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(favoriService.ajouterFavori(userId, request));
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity<Void> supprimerFavori(
            Authentication auth,
            @PathVariable Long id) {
        Long userId = getCurrentUserId(auth);
        favoriService.supprimerFavori(userId, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/favorites")
    public ResponseEntity<Void> supprimerFavoriByTarget(
            Authentication auth,
            @RequestParam TypeEtablissement type,
            @RequestParam Long targetId) {
        Long userId = getCurrentUserId(auth);
        favoriService.supprimerFavoriByTarget(userId, type, targetId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/favorites/check")
    public ResponseEntity<Map<String, Boolean>> checkFavori(
            Authentication auth,
            @RequestParam TypeEtablissement type,
            @RequestParam Long targetId) {
        Long userId = getCurrentUserId(auth);
        Map<String, Boolean> result = new HashMap<>();
        result.put("isFavorite", favoriService.isFavori(userId, type, targetId));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/favorites/sync")
    public ResponseEntity<List<Favori>> syncFavoris(
            Authentication auth,
            @RequestBody List<FavoriRequest> requests) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.ok(favoriService.syncFavoris(userId, requests));
    }

    // ===== Visites =====

    @GetMapping("/visits")
    public ResponseEntity<List<Visite>> getVisites(
            Authentication auth,
            @RequestParam(required = false) TypeEtablissement type) {
        Long userId = getCurrentUserId(auth);
        if (type != null) {
            return ResponseEntity.ok(visiteService.getVisitesByType(userId, type));
        }
        return ResponseEntity.ok(visiteService.getVisites(userId));
    }

    @PostMapping("/visits")
    public ResponseEntity<Visite> ajouterVisite(
            Authentication auth,
            @Valid @RequestBody VisiteRequest request) {
        Long userId = getCurrentUserId(auth);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(visiteService.ajouterVisite(userId, request));
    }

    // ===== Profil =====

    @PutMapping("/profile")
    public ResponseEntity<Utilisateur> updateProfile(
            Authentication auth,
            @Valid @RequestBody ProfilUpdateRequest updates) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        if (updates.getNom() != null) utilisateur.setNom(updates.getNom());
        if (updates.getPrenom() != null) utilisateur.setPrenom(updates.getPrenom());
        if (updates.getAvatar() != null) utilisateur.setAvatar(updates.getAvatar());
        if (updates.getTelephone() != null) utilisateur.setTelephone(updates.getTelephone());

        return ResponseEntity.ok(utilisateurRepository.save(utilisateur));
    }

    // ===== Changement de mot de passe =====

    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> changePassword(
            Authentication auth,
            @Valid @RequestBody ChangePasswordRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(request.getOldPassword(), utilisateur.getMotDePasse())) {
            throw new AuthentificationException("L'ancien mot de passe est incorrect");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(request.getNewPassword()));
        utilisateurRepository.save(utilisateur);

        return ResponseEntity.ok(Collections.singletonMap("message", "Mot de passe modifie avec succes"));
    }
}
