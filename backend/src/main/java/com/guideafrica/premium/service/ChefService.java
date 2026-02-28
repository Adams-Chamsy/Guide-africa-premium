package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Chef;
import com.guideafrica.premium.repository.ChefRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChefService {

    private final ChefRepository chefRepository;

    public ChefService(ChefRepository chefRepository) {
        this.chefRepository = chefRepository;
    }

    public List<Chef> findAll() {
        return chefRepository.findAll();
    }

    public Chef findById(Long id) {
        return chefRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chef", id));
    }

    public List<Chef> searchByNom(String nom) {
        return chefRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<Chef> findBySpecialite(String specialite) {
        return chefRepository.findBySpecialiteContainingIgnoreCase(specialite);
    }

    public List<Chef> findByNationalite(String nationalite) {
        return chefRepository.findByNationaliteIgnoreCase(nationalite);
    }

    public Chef create(Chef chef) {
        return chefRepository.save(chef);
    }

    public Chef update(Long id, Chef details) {
        Chef chef = findById(id);
        chef.setNom(details.getNom());
        chef.setBio(details.getBio());
        chef.setPhoto(details.getPhoto());
        chef.setSpecialite(details.getSpecialite());
        chef.setNationalite(details.getNationalite());
        chef.setAnneesExperience(details.getAnneesExperience());
        return chefRepository.save(chef);
    }

    public void delete(Long id) {
        Chef chef = findById(id);
        chefRepository.delete(chef);
    }
}
