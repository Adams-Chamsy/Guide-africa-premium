package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/compare")
public class CompareController {
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public CompareController(RestaurantRepository restaurantRepository, HotelRepository hotelRepository) {
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> compareRestaurants(@RequestParam List<Long> ids) {
        return ResponseEntity.ok(restaurantRepository.findAllById(ids));
    }

    @GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> compareHotels(@RequestParam List<Long> ids) {
        return ResponseEntity.ok(hotelRepository.findAllById(ids));
    }
}
