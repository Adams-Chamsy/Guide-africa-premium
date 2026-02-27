package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByNomContainingIgnoreCase(String nom);
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);
    List<Restaurant> findByNoteGreaterThanEqual(Double note);
    List<Restaurant> findByCategories_Id(Long categoryId);
}
