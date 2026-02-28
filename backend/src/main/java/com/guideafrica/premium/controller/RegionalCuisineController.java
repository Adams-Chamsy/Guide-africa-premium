package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.RegionalCuisine;
import com.guideafrica.premium.service.RegionalCuisineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cuisines")
public class RegionalCuisineController {

    private final RegionalCuisineService regionalCuisineService;

    public RegionalCuisineController(RegionalCuisineService regionalCuisineService) {
        this.regionalCuisineService = regionalCuisineService;
    }

    @GetMapping
    public ResponseEntity<List<RegionalCuisine>> getAll(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String pays,
            @RequestParam(required = false) String region) {

        List<RegionalCuisine> cuisines;

        if (nom != null && !nom.isBlank()) {
            cuisines = regionalCuisineService.searchByNom(nom);
        } else if (pays != null && !pays.isBlank()) {
            cuisines = regionalCuisineService.findByPays(pays);
        } else if (region != null && !region.isBlank()) {
            cuisines = regionalCuisineService.findByRegion(region);
        } else {
            cuisines = regionalCuisineService.findAll();
        }

        return ResponseEntity.ok(cuisines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegionalCuisine> getById(@PathVariable Long id) {
        return ResponseEntity.ok(regionalCuisineService.findById(id));
    }

    @PostMapping
    public ResponseEntity<RegionalCuisine> create(@Valid @RequestBody RegionalCuisine cuisine) {
        return ResponseEntity.status(HttpStatus.CREATED).body(regionalCuisineService.create(cuisine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegionalCuisine> update(@PathVariable Long id, @Valid @RequestBody RegionalCuisine cuisine) {
        return ResponseEntity.ok(regionalCuisineService.update(id, cuisine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        regionalCuisineService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
