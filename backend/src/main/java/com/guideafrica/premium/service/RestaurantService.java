package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Transactional(readOnly = true)
    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Restaurant> findAll(Pageable pageable) {
        return restaurantRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
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

    public List<Restaurant> findByVille(Long villeId) {
        return restaurantRepository.findByVilleId(villeId);
    }

    public List<Restaurant> findByPays(String pays) {
        return restaurantRepository.findByVillePaysIgnoreCase(pays);
    }

    public Page<Restaurant> searchAdvanced(String nom, String cuisine, Double noteMin,
                                            Long villeId, Integer fourchettePrix, Pageable pageable) {
        return restaurantRepository.searchAdvanced(nom, cuisine, noteMin, villeId, fourchettePrix, pageable);
    }

    @Transactional
    public Restaurant create(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Transactional
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
        restaurant.setFourchettePrix(details.getFourchettePrix());
        restaurant.setStatut(details.getStatut());
        restaurant.setHalal(details.isHalal());
        restaurant.setVegetarienFriendly(details.isVegetarienFriendly());
        restaurant.setOptionsVegan(details.isOptionsVegan());
        restaurant.setSansGluten(details.isSansGluten());
        restaurant.setSiteWeb(details.getSiteWeb());
        restaurant.setInstagram(details.getInstagram());
        restaurant.setFacebook(details.getFacebook());
        restaurant.setModesPayement(details.getModesPayement());
        restaurant.setLanguesParlees(details.getLanguesParlees());
        restaurant.setCodeVestimentaire(details.getCodeVestimentaire());
        restaurant.setTerrasse(details.isTerrasse());
        restaurant.setWifi(details.isWifi());
        restaurant.setParking(details.isParking());
        restaurant.setClimatisation(details.isClimatisation());
        restaurant.setSallePrivee(details.isSallePrivee());
        restaurant.setMusiqueLive(details.isMusiqueLive());
        restaurant.setCapacite(details.getCapacite());
        restaurant.setVille(details.getVille());
        restaurant.setAmenities(details.getAmenities());
        return restaurantRepository.save(restaurant);
    }

    @Transactional
    public void delete(Long id) {
        Restaurant restaurant = findById(id);
        restaurant.setActif(false);
        restaurantRepository.save(restaurant);
    }
}
