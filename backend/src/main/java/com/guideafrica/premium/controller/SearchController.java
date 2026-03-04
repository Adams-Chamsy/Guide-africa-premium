package com.guideafrica.premium.controller;

import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/search")
@Validated
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
            @RequestParam @Size(min = 2, max = 100) String q,
            @RequestParam(defaultValue = "5") int limit) {
        Map<String, Object> results = new HashMap<>();
        results.put("restaurants", restaurantRepository.findByNomContainingIgnoreCase(q, PageRequest.of(0, limit)).getContent());
        results.put("hotels", hotelRepository.findByNomContainingIgnoreCase(q, PageRequest.of(0, limit)).getContent());
        return ResponseEntity.ok(results);
    }
}
