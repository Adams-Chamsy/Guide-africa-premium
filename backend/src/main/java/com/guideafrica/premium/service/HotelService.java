package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Review;
import com.guideafrica.premium.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> findAll() {
        return hotelRepository.findAll();
    }

    public Hotel findById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hôtel", id));
    }

    public List<Hotel> searchByNom(String nom) {
        return hotelRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<Hotel> filterByMinEtoiles(Integer etoilesMin) {
        return hotelRepository.findByEtoilesGreaterThanEqual(etoilesMin);
    }

    public List<Hotel> filterByMaxPrix(Double prixMax) {
        return hotelRepository.findByPrixParNuitLessThanEqual(prixMax);
    }

    public List<Hotel> filterByCategory(Long categoryId) {
        return hotelRepository.findByCategories_Id(categoryId);
    }

    public Hotel create(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Hotel update(Long id, Hotel details) {
        Hotel hotel = findById(id);
        hotel.setNom(details.getNom());
        hotel.setDescription(details.getDescription());
        hotel.setAdresse(details.getAdresse());
        hotel.setEtoiles(details.getEtoiles());
        hotel.setPrixParNuit(details.getPrixParNuit());
        hotel.setImage(details.getImage());
        hotel.setCoordonneesGps(details.getCoordonneesGps());
        hotel.setTelephone(details.getTelephone());
        hotel.setEmail(details.getEmail());
        hotel.setGaleriePhotos(details.getGaleriePhotos());
        hotel.setCategories(details.getCategories());
        return hotelRepository.save(hotel);
    }

    public void delete(Long id) {
        Hotel hotel = findById(id);
        hotelRepository.delete(hotel);
    }

    public void recalculateNote(Hotel hotel) {
        List<Review> reviews = hotel.getAvisUtilisateurs();
        if (reviews == null || reviews.isEmpty()) {
            return;
        }
        double average = reviews.stream()
                .mapToInt(Review::getNote)
                .average()
                .orElse(0.0);
        // Hotels don't have a "note" field, so we don't update it
        // The average can be computed client-side from reviews
    }
}
