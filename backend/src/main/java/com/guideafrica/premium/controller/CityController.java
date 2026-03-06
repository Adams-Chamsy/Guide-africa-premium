package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.City;
import com.guideafrica.premium.service.CityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cities")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<City>> getAll(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String pays,
            @RequestParam(required = false) String region) {

        List<City> cities;

        if (nom != null && !nom.isBlank()) {
            cities = cityService.searchByNom(nom);
        } else if (pays != null && !pays.isBlank()) {
            cities = cityService.findByPays(pays);
        } else if (region != null && !region.isBlank()) {
            cities = cityService.findByRegion(region);
        } else {
            cities = cityService.findAll();
        }

        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getById(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<City> create(@Valid @RequestBody City city) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cityService.create(city));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<City> update(@PathVariable Long id, @Valid @RequestBody City city) {
        return ResponseEntity.ok(cityService.update(id, city));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
