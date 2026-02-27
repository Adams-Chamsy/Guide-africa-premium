package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    public Restaurant findById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));
    }

    public List<Restaurant> searchByNom(String nom) {
        return restaurantRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<Restaurant> filterByCuisine(String cuisine) {
        return restaurantRepository.findByCuisineContainingIgnoreCase(cuisine);
    }

    public List<Restaurant> filterByMinNote(Double noteMin) {
        return restaurantRepository.findByNoteGreaterThanEqual(noteMin);
    }

    public List<Restaurant> filterByCategory(Long categoryId) {
        return restaurantRepository.findByCategories_Id(categoryId);
    }

    public Restaurant create(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant update(Long id, Restaurant details) {
        Restaurant restaurant = findById(id);
        restaurant.setNom(details.getNom());
        restaurant.setDescription(details.getDescription());
        restaurant.setAdresse(details.getAdresse());
        restaurant.setCuisine(details.getCuisine());
        restaurant.setImage(details.getImage());
        restaurant.setCoordonneesGps(details.getCoordonneesGps());
        restaurant.setTelephone(details.getTelephone());
        restaurant.setEmail(details.getEmail());
        restaurant.setHoraires(details.getHoraires());
        restaurant.setGaleriePhotos(details.getGaleriePhotos());
        restaurant.setCategories(details.getCategories());
        return restaurantRepository.save(restaurant);
    }

    public void delete(Long id) {
        Restaurant restaurant = findById(id);
        restaurantRepository.delete(restaurant);
    }

}
