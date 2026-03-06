package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Amenity;
import com.guideafrica.premium.service.AmenityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/amenities")
public class AmenityController {

    private final AmenityService amenityService;

    public AmenityController(AmenityService amenityService) {
        this.amenityService = amenityService;
    }

    @GetMapping
    public ResponseEntity<List<Amenity>> getAll(
            @RequestParam(required = false) String type) {

        if (type != null && !type.isBlank()) {
            return ResponseEntity.ok(amenityService.findByType(type));
        }
        return ResponseEntity.ok(amenityService.findAll());
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Amenity>> getForRestaurants() {
        return ResponseEntity.ok(amenityService.findForRestaurants());
    }

    @GetMapping("/hotels")
    public ResponseEntity<List<Amenity>> getForHotels() {
        return ResponseEntity.ok(amenityService.findForHotels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Amenity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(amenityService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Amenity> create(@Valid @RequestBody Amenity amenity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(amenityService.create(amenity));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Amenity> update(@PathVariable Long id, @Valid @RequestBody Amenity amenity) {
        return ResponseEntity.ok(amenityService.update(id, amenity));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        amenityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
