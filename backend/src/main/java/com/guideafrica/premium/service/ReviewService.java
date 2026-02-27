package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         RestaurantRepository restaurantRepository,
                         HotelRepository hotelRepository) {
        this.reviewRepository = reviewRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<Review> findByRestaurantId(Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    public List<Review> findByHotelId(Long hotelId) {
        return reviewRepository.findByHotelId(hotelId);
    }

    @Transactional
    public Review addReviewToRestaurant(Long restaurantId, Review review) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
        review.setRestaurant(restaurant);
        Review saved = reviewRepository.save(review);
        // Recalculate average note using all reviews from DB
        recalculateRestaurantNote(restaurant);
        return saved;
    }

    @Transactional
    public Review addReviewToHotel(Long hotelId, Review review) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hôtel", hotelId));
        review.setHotel(hotel);
        return reviewRepository.save(review);
    }

    @Transactional
    public Review update(Long id, Review details) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", id));
        review.setAuteur(details.getAuteur());
        review.setNote(details.getNote());
        review.setCommentaire(details.getCommentaire());
        Review saved = reviewRepository.save(review);
        // Recalculate average if linked to restaurant
        if (review.getRestaurant() != null) {
            recalculateRestaurantNote(review.getRestaurant());
        }
        return saved;
    }

    @Transactional
    public void delete(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", id));
        Restaurant restaurant = review.getRestaurant();
        reviewRepository.delete(review);
        // Recalculate average if was linked to restaurant
        if (restaurant != null) {
            reviewRepository.flush();
            recalculateRestaurantNote(restaurant);
        }
    }

    private void recalculateRestaurantNote(Restaurant restaurant) {
        List<Review> reviews = reviewRepository.findByRestaurantId(restaurant.getId());
        if (reviews.isEmpty()) {
            restaurant.setNote(0.0);
        } else {
            double average = reviews.stream()
                    .mapToInt(Review::getNote)
                    .average()
                    .orElse(0.0);
            restaurant.setNote(Math.round(average * 10.0) / 10.0);
        }
        restaurantRepository.save(restaurant);
    }
}
