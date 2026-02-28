package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Amenity;
import com.guideafrica.premium.repository.AmenityRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AmenityService {

    private final AmenityRepository amenityRepository;

    public AmenityService(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

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

    public List<Amenity> findForRestaurants() {
        return amenityRepository.findByTypeIn(Arrays.asList("RESTAURANT", "BOTH"));
    }

    public List<Amenity> findForHotels() {
        return amenityRepository.findByTypeIn(Arrays.asList("HOTEL", "BOTH"));
    }

    public Amenity create(Amenity amenity) {
        return amenityRepository.save(amenity);
    }

    public Amenity update(Long id, Amenity details) {
        Amenity amenity = findById(id);
        amenity.setNom(details.getNom());
        amenity.setIcone(details.getIcone());
        amenity.setType(details.getType());
        return amenityRepository.save(amenity);
    }

    public void delete(Long id) {
        Amenity amenity = findById(id);
        amenityRepository.delete(amenity);
    }
}
