package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    public Page<Review> findByRestaurantId(Long restaurantId, Pageable pageable) {
        return reviewRepository.findByRestaurantId(restaurantId, pageable);
    }

    public Page<Review> findByHotelId(Long hotelId, Pageable pageable) {
        return reviewRepository.findByHotelId(hotelId, pageable);
    }

    public List<Review> findMostUsefulByRestaurant(Long restaurantId) {
        return reviewRepository.findByRestaurantIdOrderByVotesUtilesDesc(restaurantId);
    }

    public List<Review> findMostUsefulByHotel(Long hotelId) {
        return reviewRepository.findByHotelIdOrderByVotesUtilesDesc(hotelId);
    }

    @Transactional
    public Review addReviewToRestaurant(Long restaurantId, Review review) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
        review.setRestaurant(restaurant);
        Review saved = reviewRepository.save(review);
        recalculateRestaurantNote(restaurant);
        return saved;
    }

    @Transactional
    public Review addReviewToHotel(Long hotelId, Review review) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hôtel", hotelId));
        review.setHotel(hotel);
        Review saved = reviewRepository.save(review);
        recalculateHotelNote(hotel);
        return saved;
    }

    @Transactional
    public Review update(Long id, Review details) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", id));
        review.setAuteur(details.getAuteur());
        review.setNote(details.getNote());
        review.setCommentaire(details.getCommentaire());
        review.setTitre(details.getTitre());
        review.setNoteCuisine(details.getNoteCuisine());
        review.setNoteService(details.getNoteService());
        review.setNoteAmbiance(details.getNoteAmbiance());
        review.setNoteRapportQualitePrix(details.getNoteRapportQualitePrix());
        review.setTypeVoyageur(details.getTypeVoyageur());
        review.setPhotos(details.getPhotos());
        Review saved = reviewRepository.save(review);
        if (review.getRestaurant() != null) {
            recalculateRestaurantNote(review.getRestaurant());
        }
        if (review.getHotel() != null) {
            recalculateHotelNote(review.getHotel());
        }
        return saved;
    }

    @Transactional
    public Review addOwnerResponse(Long reviewId, String response) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", reviewId));
        review.setReponseProprietaire(response);
        review.setDateReponse(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Transactional
    public Review voteUseful(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", reviewId));
        review.setVotesUtiles(review.getVotesUtiles() + 1);
        return reviewRepository.save(review);
    }

    @Transactional
    public void delete(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Avis", id));
        Restaurant restaurant = review.getRestaurant();
        Hotel hotel = review.getHotel();
        reviewRepository.delete(review);
        reviewRepository.flush();
        if (restaurant != null) {
            recalculateRestaurantNote(restaurant);
        }
        if (hotel != null) {
            recalculateHotelNote(hotel);
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

    private void recalculateHotelNote(Hotel hotel) {
        List<Review> reviews = reviewRepository.findByHotelId(hotel.getId());
        if (reviews.isEmpty()) {
            hotel.setNote(0.0);
        } else {
            double average = reviews.stream()
                    .mapToInt(Review::getNote)
                    .average()
                    .orElse(0.0);
            hotel.setNote(Math.round(average * 10.0) / 10.0);
        }
        hotelRepository.save(hotel);
    }
}
