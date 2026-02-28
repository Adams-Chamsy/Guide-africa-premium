package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    Optional<Amenity> findByNomIgnoreCase(String nom);
    List<Amenity> findByType(String type);
    List<Amenity> findByTypeIn(List<String> types);
}
