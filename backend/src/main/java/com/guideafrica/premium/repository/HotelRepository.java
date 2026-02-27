package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByNomContainingIgnoreCase(String nom);
    List<Hotel> findByEtoilesGreaterThanEqual(Integer etoiles);
    List<Hotel> findByPrixParNuitLessThanEqual(Double prix);
    List<Hotel> findByCategories_Id(Long categoryId);
}
