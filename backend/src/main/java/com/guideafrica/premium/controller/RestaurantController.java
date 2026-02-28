package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) Double noteMin,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long villeId,
            @RequestParam(required = false) String pays,
            @RequestParam(required = false) Integer fourchettePrix,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "nom") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        // Si pagination demandée
        if (page != null) {
            Sort sort = "desc".equalsIgnoreCase(direction) ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size != null ? size : 12, sort);

            // Si des filtres avancés sont fournis
            if (nom != null || cuisine != null || noteMin != null || villeId != null || fourchettePrix != null) {
                return ResponseEntity.ok(restaurantService.searchAdvanced(nom, cuisine, noteMin, villeId, fourchettePrix, pageable));
            }
            return ResponseEntity.ok(restaurantService.findAll(pageable));
        }

        // Sans pagination (rétrocompatibilité)
        List<Restaurant> restaurants;
        if (nom != null && !nom.isBlank()) {
            restaurants = restaurantService.searchByNom(nom);
        } else if (cuisine != null && !cuisine.isBlank()) {
            restaurants = restaurantService.filterByCuisine(cuisine);
        } else if (noteMin != null) {
            restaurants = restaurantService.filterByMinNote(noteMin);
        } else if (categoryId != null) {
            restaurants = restaurantService.filterByCategory(categoryId);
        } else if (villeId != null) {
            restaurants = restaurantService.findByVille(villeId);
        } else if (pays != null && !pays.isBlank()) {
            restaurants = restaurantService.findByPays(pays);
        } else {
            restaurants = restaurantService.findAll();
        }

        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Restaurant> create(@Valid @RequestBody Restaurant restaurant) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.create(restaurant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> update(@PathVariable Long id, @Valid @RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(restaurantService.update(id, restaurant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        restaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
