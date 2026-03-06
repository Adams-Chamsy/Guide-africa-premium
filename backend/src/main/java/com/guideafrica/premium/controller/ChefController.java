package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Chef;
import com.guideafrica.premium.service.ChefService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chefs")
public class ChefController {

    private final ChefService chefService;

    public ChefController(ChefService chefService) {
        this.chefService = chefService;
    }

    @GetMapping
    public ResponseEntity<List<Chef>> getAll(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String specialite,
            @RequestParam(required = false) String nationalite) {

        List<Chef> chefs;

        if (nom != null && !nom.isBlank()) {
            chefs = chefService.searchByNom(nom);
        } else if (specialite != null && !specialite.isBlank()) {
            chefs = chefService.findBySpecialite(specialite);
        } else if (nationalite != null && !nationalite.isBlank()) {
            chefs = chefService.findByNationalite(nationalite);
        } else {
            chefs = chefService.findAll();
        }

        return ResponseEntity.ok(chefs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chef> getById(@PathVariable Long id) {
        return ResponseEntity.ok(chefService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Chef> create(@Valid @RequestBody Chef chef) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chefService.create(chef));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Chef> update(@PathVariable Long id, @Valid @RequestBody Chef chef) {
        return ResponseEntity.ok(chefService.update(id, chef));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        chefService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
