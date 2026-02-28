package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Distinction;
import com.guideafrica.premium.model.enums.TypeDistinction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistinctionRepository extends JpaRepository<Distinction, Long> {
    List<Distinction> findByRestaurantId(Long restaurantId);
    List<Distinction> findByType(TypeDistinction type);
}
