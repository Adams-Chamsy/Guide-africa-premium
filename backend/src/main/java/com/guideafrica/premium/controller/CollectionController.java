package com.guideafrica.premium.controller;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.CollectionItem;
import com.guideafrica.premium.model.UserCollection;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.service.CollectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {

    private final CollectionService collectionService;
    private final UtilisateurRepository utilisateurRepository;

    public CollectionController(CollectionService collectionService,
                                UtilisateurRepository utilisateurRepository) {
        this.collectionService = collectionService;
        this.utilisateurRepository = utilisateurRepository;
    }

    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
        return utilisateur.getId();
    }

    @GetMapping
    public ResponseEntity<List<UserCollection>> getUserCollections(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        return ResponseEntity.ok(collectionService.getUserCollections(userId));
    }

    @PostMapping
    public ResponseEntity<UserCollection> createCollection(
            Authentication authentication,
            @RequestBody Map<String, Object> body) {
        Long userId = getCurrentUserId(authentication);
        String nom = (String) body.get("nom");
        String description = (String) body.get("description");
        boolean publique = body.containsKey("publique") && Boolean.TRUE.equals(body.get("publique"));
        UserCollection collection = collectionService.createCollection(userId, nom, description, publique);
        return ResponseEntity.status(HttpStatus.CREATED).body(collection);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserCollection> getCollectionById(
            @PathVariable Long id,
            Authentication authentication) {
        UserCollection collection = collectionService.getCollectionById(id);

        // If collection is public, allow access without auth
        if (collection.isPublique()) {
            return ResponseEntity.ok(collection);
        }

        // If not public, require authentication and ownership
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Long userId = getCurrentUserId(authentication);
        if (!collection.getUtilisateur().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(collection);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserCollection> updateCollection(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Long userId = getCurrentUserId(authentication);
        String nom = (String) body.get("nom");
        String description = (String) body.get("description");
        boolean publique = body.containsKey("publique") && Boolean.TRUE.equals(body.get("publique"));
        UserCollection collection = collectionService.updateCollection(userId, id, nom, description, publique);
        return ResponseEntity.ok(collection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollection(
            Authentication authentication,
            @PathVariable Long id) {
        Long userId = getCurrentUserId(authentication);
        collectionService.deleteCollection(userId, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<CollectionItem> addItem(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Long userId = getCurrentUserId(authentication);
        TypeEtablissement type = TypeEtablissement.valueOf((String) body.get("type"));
        Long targetId = Long.valueOf(body.get("targetId").toString());
        CollectionItem item = collectionService.addItem(userId, id, type, targetId);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<Void> removeItem(
            Authentication authentication,
            @PathVariable Long id,
            @PathVariable Long itemId) {
        Long userId = getCurrentUserId(authentication);
        collectionService.removeItem(userId, id, itemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/public")
    public ResponseEntity<List<UserCollection>> getPublicCollections() {
        return ResponseEntity.ok(collectionService.getPublicCollections());
    }
}
