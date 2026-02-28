package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRestaurantId(Long restaurantId);
    List<Review> findByHotelId(Long hotelId);

    // Pagination
    Page<Review> findByRestaurantId(Long restaurantId, Pageable pageable);
    Page<Review> findByHotelId(Long hotelId, Pageable pageable);

    // Tri par votes utiles
    List<Review> findByRestaurantIdOrderByVotesUtilesDesc(Long restaurantId);
    List<Review> findByHotelIdOrderByVotesUtilesDesc(Long hotelId);

    // Stats
    @Query("SELECT AVG(r.note) FROM Review r WHERE r.restaurant.id = :restaurantId")
    Double averageNoteByRestaurantId(@Param("restaurantId") Long restaurantId);

    @Query("SELECT AVG(r.note) FROM Review r WHERE r.hotel.id = :hotelId")
    Double averageNoteByHotelId(@Param("hotelId") Long hotelId);

    long countByRestaurantId(Long restaurantId);
    long countByHotelId(Long hotelId);
}
