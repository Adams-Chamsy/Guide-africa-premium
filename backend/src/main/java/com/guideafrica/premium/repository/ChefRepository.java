package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Chef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChefRepository extends JpaRepository<Chef, Long> {
    Optional<Chef> findByRestaurantId(Long restaurantId);
    List<Chef> findByNomContainingIgnoreCase(String nom);
    List<Chef> findBySpecialiteContainingIgnoreCase(String specialite);
    List<Chef> findByNationaliteIgnoreCase(String nationalite);
}
