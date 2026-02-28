package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.RegionalCuisine;
import com.guideafrica.premium.repository.RegionalCuisineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionalCuisineService {

    private final RegionalCuisineRepository regionalCuisineRepository;

    public RegionalCuisineService(RegionalCuisineRepository regionalCuisineRepository) {
        this.regionalCuisineRepository = regionalCuisineRepository;
    }

    public List<RegionalCuisine> findAll() {
        return regionalCuisineRepository.findAll();
    }

    public RegionalCuisine findById(Long id) {
        return regionalCuisineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cuisine régionale", id));
    }

    public List<RegionalCuisine> searchByNom(String nom) {
        return regionalCuisineRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<RegionalCuisine> findByPays(String pays) {
        return regionalCuisineRepository.findByPaysIgnoreCase(pays);
    }

    public List<RegionalCuisine> findByRegion(String region) {
        return regionalCuisineRepository.findByRegionContainingIgnoreCase(region);
    }

    public RegionalCuisine create(RegionalCuisine cuisine) {
        return regionalCuisineRepository.save(cuisine);
    }

    public RegionalCuisine update(Long id, RegionalCuisine details) {
        RegionalCuisine cuisine = findById(id);
        cuisine.setNom(details.getNom());
        cuisine.setRegion(details.getRegion());
        cuisine.setPays(details.getPays());
        cuisine.setDescription(details.getDescription());
        cuisine.setPlatSignature(details.getPlatSignature());
        cuisine.setIngredients(details.getIngredients());
        cuisine.setImage(details.getImage());
        return regionalCuisineRepository.save(cuisine);
    }

    public void delete(Long id) {
        RegionalCuisine cuisine = findById(id);
        regionalCuisineRepository.delete(cuisine);
    }
}
