package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ===== Restaurant Reviews =====

    @GetMapping("/restaurants/{restaurantId}/reviews")
    public ResponseEntity<?> getRestaurantReviews(
            @PathVariable Long restaurantId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String tri) {

        if ("utiles".equals(tri)) {
            return ResponseEntity.ok(reviewService.findMostUsefulByRestaurant(restaurantId));
        }

        Sort sort = "asc".equalsIgnoreCase(direction) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Review> reviews = reviewService.findByRestaurantId(restaurantId, pageable);
        return ResponseEntity.ok(reviews);
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
    public ResponseEntity<?> getHotelReviews(
            @PathVariable Long hotelId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String tri) {

        if ("utiles".equals(tri)) {
            return ResponseEntity.ok(reviewService.findMostUsefulByHotel(hotelId));
        }

        Sort sort = "asc".equalsIgnoreCase(direction) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Review> reviews = reviewService.findByHotelId(hotelId, pageable);
        return ResponseEntity.ok(reviews);
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

    // ===== Nouveaux endpoints =====

    @PostMapping("/reviews/{id}/vote")
    public ResponseEntity<Review> voteUseful(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.voteUseful(id));
    }

    @PostMapping("/reviews/{id}/response")
    public ResponseEntity<Review> addOwnerResponse(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String response = body.get("reponse");
        return ResponseEntity.ok(reviewService.addOwnerResponse(id, response));
    }
}
