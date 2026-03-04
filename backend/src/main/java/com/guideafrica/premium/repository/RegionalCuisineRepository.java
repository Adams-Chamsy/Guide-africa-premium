package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.RegionalCuisine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegionalCuisineRepository extends JpaRepository<RegionalCuisine, Long> {
    Optional<RegionalCuisine> findByNomIgnoreCase(String nom);
    List<RegionalCuisine> findByPaysIgnoreCase(String pays);
    List<RegionalCuisine> findByRegionContainingIgnoreCase(String region);
    List<RegionalCuisine> findByNomContainingIgnoreCase(String nom);
}
