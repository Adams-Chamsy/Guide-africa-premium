package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Amenity;
import com.guideafrica.premium.repository.AmenityRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AmenityService {

    private final AmenityRepository amenityRepository;

    public AmenityService(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @Cacheable("amenities")
    public List<Amenity> findAll() {
        return amenityRepository.findAll();
    }

    public Amenity findById(Long id) {
        return amenityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity", id));
    }

    public List<Amenity> findByType(String type) {
        return amenityRepository.findByType(type);
    }

    @Cacheable(value = "amenities", key = "'restaurants'")
    public List<Amenity> findForRestaurants() {
        return amenityRepository.findByTypeIn(Arrays.asList("RESTAURANT", "BOTH"));
    }

    @Cacheable(value = "amenities", key = "'hotels'")
    public List<Amenity> findForHotels() {
        return amenityRepository.findByTypeIn(Arrays.asList("HOTEL", "BOTH"));
    }

    @CacheEvict(value = "amenities", allEntries = true)
    public Amenity create(Amenity amenity) {
        return amenityRepository.save(amenity);
    }

    @CacheEvict(value = "amenities", allEntries = true)
    public Amenity update(Long id, Amenity details) {
        Amenity amenity = findById(id);
        amenity.setNom(details.getNom());
        amenity.setIcone(details.getIcone());
        amenity.setType(details.getType());
        return amenityRepository.save(amenity);
    }

    @CacheEvict(value = "amenities", allEntries = true)
    public void delete(Long id) {
        Amenity amenity = findById(id);
        amenityRepository.delete(amenity);
    }
}
