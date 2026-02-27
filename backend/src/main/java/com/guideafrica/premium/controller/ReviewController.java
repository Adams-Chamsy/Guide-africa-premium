package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ===== Restaurant Reviews =====

    @GetMapping("/restaurants/{restaurantId}/reviews")
    public ResponseEntity<List<Review>> getRestaurantReviews(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(reviewService.findByRestaurantId(restaurantId));
    }

    @PostMapping("/restaurants/{restaurantId}/reviews")
    public ResponseEntity<Review> addRestaurantReview(
            @PathVariable Long restaurantId,
            @Valid @RequestBody Review review) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReviewToRestaurant(restaurantId, review));
    }

    // ===== Hotel Reviews =====

    @GetMapping("/hotels/{hotelId}/reviews")
    public ResponseEntity<List<Review>> getHotelReviews(@PathVariable Long hotelId) {
        return ResponseEntity.ok(reviewService.findByHotelId(hotelId));
    }

    @PostMapping("/hotels/{hotelId}/reviews")
    public ResponseEntity<Review> addHotelReview(
            @PathVariable Long hotelId,
            @Valid @RequestBody Review review) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReviewToHotel(hotelId, review));
    }

    // ===== Review CRUD =====

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> update(@PathVariable Long id, @Valid @RequestBody Review review) {
        return ResponseEntity.ok(reviewService.update(id, review));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
