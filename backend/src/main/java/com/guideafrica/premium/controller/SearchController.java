package com.guideafrica.premium.controller;

import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public SearchController(RestaurantRepository restaurantRepository,
                            HotelRepository hotelRepository) {
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "5") int limit) {
        Map<String, Object> results = new HashMap<>();
        results.put("restaurants", restaurantRepository.findByNomContainingIgnoreCase(q)
                .stream().limit(limit).collect(Collectors.toList()));
        results.put("hotels", hotelRepository.findByNomContainingIgnoreCase(q)
                .stream().limit(limit).collect(Collectors.toList()));
        return ResponseEntity.ok(results);
    }
}
