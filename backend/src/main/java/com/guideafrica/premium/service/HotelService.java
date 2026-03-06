package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.repository.HotelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @Transactional(readOnly = true)
    public List<Hotel> findAll() {
        return hotelRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Hotel> findAll(Pageable pageable) {
        return hotelRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
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

    public List<Hotel> findByVille(Long villeId) {
        return hotelRepository.findByVilleId(villeId);
    }

    public List<Hotel> findByPays(String pays) {
        return hotelRepository.findByVillePaysIgnoreCase(pays);
    }

    public Page<Hotel> searchAdvanced(String nom, Integer etoilesMin, Double prixMax,
                                       Long villeId, Double noteMin, Pageable pageable) {
        return hotelRepository.searchAdvanced(nom, etoilesMin, prixMax, villeId, noteMin, pageable);
    }

    @Transactional
    public Hotel create(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Transactional
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
        hotel.setStatut(details.getStatut());
        hotel.setSiteWeb(details.getSiteWeb());
        hotel.setInstagram(details.getInstagram());
        hotel.setFacebook(details.getFacebook());
        hotel.setModesPayement(details.getModesPayement());
        hotel.setLanguesParlees(details.getLanguesParlees());
        hotel.setWifi(details.isWifi());
        hotel.setParking(details.isParking());
        hotel.setPiscine(details.isPiscine());
        hotel.setSpa(details.isSpa());
        hotel.setRestaurantSurPlace(details.isRestaurantSurPlace());
        hotel.setSalleSport(details.isSalleSport());
        hotel.setNavette(details.isNavette());
        hotel.setPetitDejeunerInclus(details.isPetitDejeunerInclus());
        hotel.setAnimauxAcceptes(details.isAnimauxAcceptes());
        hotel.setClimatisation(details.isClimatisation());
        hotel.setRoomService(details.isRoomService());
        hotel.setConciergerie(details.isConciergerie());
        hotel.setCheckIn(details.getCheckIn());
        hotel.setCheckOut(details.getCheckOut());
        hotel.setNombreChambres(details.getNombreChambres());
        hotel.setVille(details.getVille());
        hotel.setAmenities(details.getAmenities());
        return hotelRepository.save(hotel);
    }

    @Transactional
    public void delete(Long id) {
        Hotel hotel = findById(id);
        hotel.setActif(false);
        hotelRepository.save(hotel);
    }
}
