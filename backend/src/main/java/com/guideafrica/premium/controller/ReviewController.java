package com.guideafrica.premium.controller;

import com.guideafrica.premium.dto.ReviewRequest;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.model.enums.TypeVoyageur;
import com.guideafrica.premium.service.ReviewService;
import com.guideafrica.premium.util.HtmlSanitizer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
            @RequestBody @Valid ReviewRequest request,
            Authentication authentication) {
        Review review = mapToReview(request, authentication);
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
            @RequestBody @Valid ReviewRequest request,
            Authentication authentication) {
        Review review = mapToReview(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReviewToHotel(hotelId, review));
    }

    // ===== Review CRUD =====

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> update(@PathVariable Long id, @RequestBody @Valid ReviewRequest request,
                                          Authentication authentication) {
        Review existing = reviewService.findById(id);
        if (!existing.getAuteur().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Review review = mapToReview(request, authentication);
        return ResponseEntity.ok(reviewService.update(id, review));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        Review existing = reviewService.findById(id);
        if (!existing.getAuteur().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ===== Nouveaux endpoints =====

    @PostMapping("/reviews/{id}/vote")
    public ResponseEntity<Review> voteUseful(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.voteUseful(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/reviews/{id}/response")
    public ResponseEntity<Review> addOwnerResponse(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String response = body.get("reponse");
        return ResponseEntity.ok(reviewService.addOwnerResponse(id, response));
    }

    // ===== Private helpers =====

    /**
     * Maps a ReviewRequest DTO to a Review entity.
     * Applies HTML sanitization on text fields.
     * Overrides auteur from Authentication if the user is authenticated.
     */
    private Review mapToReview(ReviewRequest request, Authentication authentication) {
        Review review = new Review();

        // Override auteur from authentication if available
        if (authentication != null && authentication.getName() != null) {
            review.setAuteur(HtmlSanitizer.sanitize(authentication.getName()));
        } else {
            review.setAuteur(HtmlSanitizer.sanitize(request.getAuteur()));
        }

        review.setNote(request.getNote());
        review.setCommentaire(HtmlSanitizer.sanitize(request.getCommentaire()));
        review.setTitre(HtmlSanitizer.sanitize(request.getTitre()));
        review.setNoteCuisine(request.getNoteCuisine());
        review.setNoteService(request.getNoteService());
        review.setNoteAmbiance(request.getNoteAmbiance());
        review.setNoteRapportQualitePrix(request.getNoteRapportQualitePrix());
        review.setPhotos(request.getPhotos());

        if (request.getTypeVoyageur() != null && !request.getTypeVoyageur().isEmpty()) {
            review.setTypeVoyageur(TypeVoyageur.valueOf(request.getTypeVoyageur()));
        }

        return review;
    }
}
