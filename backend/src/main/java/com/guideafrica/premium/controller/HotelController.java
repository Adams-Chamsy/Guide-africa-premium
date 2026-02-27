package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getAll(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) Integer etoilesMin,
            @RequestParam(required = false) Double prixMax,
            @RequestParam(required = false) Long categoryId) {

        List<Hotel> hotels;

        if (nom != null && !nom.isBlank()) {
            hotels = hotelService.searchByNom(nom);
        } else if (etoilesMin != null) {
            hotels = hotelService.filterByMinEtoiles(etoilesMin);
        } else if (prixMax != null) {
            hotels = hotelService.filterByMaxPrix(prixMax);
        } else if (categoryId != null) {
            hotels = hotelService.filterByCategory(categoryId);
        } else {
            hotels = hotelService.findAll();
        }

        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Hotel> create(@Valid @RequestBody Hotel hotel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.create(hotel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, @Valid @RequestBody Hotel hotel) {
        return ResponseEntity.ok(hotelService.update(id, hotel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
