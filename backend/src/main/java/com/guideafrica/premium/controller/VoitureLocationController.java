package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.VoitureLocation;
import com.guideafrica.premium.model.enums.CategorieVoiture;
import com.guideafrica.premium.model.enums.TypeTransmission;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.VoitureLocationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/voitures")
public class VoitureLocationController {

    private final VoitureLocationService voitureService;
    private final UtilisateurRepository utilisateurRepository;

    public VoitureLocationController(VoitureLocationService voitureService,
                                      UtilisateurRepository utilisateurRepository) {
        this.voitureService = voitureService;
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping
    public ResponseEntity<Page<VoitureLocation>> getAll(
            @RequestParam(required = false) String marque,
            @RequestParam(required = false) CategorieVoiture categorie,
            @RequestParam(required = false) TypeTransmission transmission,
            @RequestParam(required = false) Long villeId,
            @RequestParam(required = false) BigDecimal prixMax,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return ResponseEntity.ok(voitureService.findAll(marque, categorie, transmission, villeId, prixMax, page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoitureLocation> getById(@PathVariable Long id) {
        return ResponseEntity.ok(voitureService.findById(id));
    }

    @GetMapping("/mes-voitures")
    public ResponseEntity<List<VoitureLocation>> getMesVoitures(Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(voitureService.findByProprietaire(user.getId()));
    }

    @PostMapping
    public ResponseEntity<VoitureLocation> create(@Valid @RequestBody VoitureLocation voiture,
                                                    Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(voitureService.create(voiture, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoitureLocation> update(@PathVariable Long id,
                                                    @Valid @RequestBody VoitureLocation voiture,
                                                    Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(voitureService.update(id, voiture, user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        voitureService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/toggle-disponibilite")
    public ResponseEntity<VoitureLocation> toggleDisponibilite(@PathVariable Long id,
                                                                 Authentication authentication) {
        Utilisateur user = utilisateurRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        return ResponseEntity.ok(voitureService.toggleDisponibilite(id, user.getId()));
    }
}
