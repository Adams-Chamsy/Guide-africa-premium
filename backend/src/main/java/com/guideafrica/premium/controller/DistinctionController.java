package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Distinction;
import com.guideafrica.premium.model.enums.TypeDistinction;
import com.guideafrica.premium.service.DistinctionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DistinctionController {

    private final DistinctionService distinctionService;

    public DistinctionController(DistinctionService distinctionService) {
        this.distinctionService = distinctionService;
    }

    @GetMapping("/distinctions")
    public ResponseEntity<List<Distinction>> getAll(
            @RequestParam(required = false) TypeDistinction type) {

        if (type != null) {
            return ResponseEntity.ok(distinctionService.findByType(type));
        }
        return ResponseEntity.ok(distinctionService.findAll());
    }

    @GetMapping("/restaurants/{restaurantId}/distinctions")
    public ResponseEntity<List<Distinction>> getByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(distinctionService.findByRestaurantId(restaurantId));
    }

    @PostMapping("/restaurants/{restaurantId}/distinctions")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Distinction> add(
            @PathVariable Long restaurantId,
            @Valid @RequestBody Distinction distinction) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(distinctionService.addToRestaurant(restaurantId, distinction));
    }

    @DeleteMapping("/distinctions/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        distinctionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
