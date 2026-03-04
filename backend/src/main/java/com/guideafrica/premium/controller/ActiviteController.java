package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Activite;
import com.guideafrica.premium.model.enums.CategorieActivite;
import com.guideafrica.premium.model.enums.DifficulteActivite;
import com.guideafrica.premium.service.ActiviteService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/activites")
public class ActiviteController {

    private final ActiviteService activiteService;

    public ActiviteController(ActiviteService activiteService) {
        this.activiteService = activiteService;
    }

    @GetMapping
    public ResponseEntity<Page<Activite>> getAll(
            @RequestParam(required = false) String titre,
            @RequestParam(required = false) CategorieActivite categorie,
            @RequestParam(required = false) DifficulteActivite difficulte,
            @RequestParam(required = false) Long villeId,
            @RequestParam(required = false) BigDecimal prixMax,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return ResponseEntity.ok(activiteService.findAll(titre, categorie, difficulte, villeId, prixMax, page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activite> getById(@PathVariable Long id) {
        return ResponseEntity.ok(activiteService.findById(id));
    }

    @GetMapping("/top")
    public ResponseEntity<List<Activite>> getTopRated() {
        return ResponseEntity.ok(activiteService.findTopRated());
    }

    @PostMapping
    public ResponseEntity<Activite> create(@RequestBody Activite activite) {
        return ResponseEntity.ok(activiteService.create(activite));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activite> update(@PathVariable Long id, @RequestBody Activite activite) {
        return ResponseEntity.ok(activiteService.update(id, activite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activiteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
