package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Distinction;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.enums.TypeDistinction;
import com.guideafrica.premium.repository.DistinctionRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistinctionService {

    private final DistinctionRepository distinctionRepository;
    private final RestaurantRepository restaurantRepository;

    public DistinctionService(DistinctionRepository distinctionRepository, RestaurantRepository restaurantRepository) {
        this.distinctionRepository = distinctionRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<Distinction> findByRestaurantId(Long restaurantId) {
        return distinctionRepository.findByRestaurantId(restaurantId);
    }

    public List<Distinction> findByType(TypeDistinction type) {
        return distinctionRepository.findByType(type);
    }

    public List<Distinction> findAll() {
        return distinctionRepository.findAll();
    }

    public Distinction findById(Long id) {
        return distinctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Distinction", id));
    }

    public Distinction addToRestaurant(Long restaurantId, Distinction distinction) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
        distinction.setRestaurant(restaurant);
        return distinctionRepository.save(distinction);
    }

    public void delete(Long id) {
        Distinction distinction = findById(id);
        distinctionRepository.delete(distinction);
    }
}
