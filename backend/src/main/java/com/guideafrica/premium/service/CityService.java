package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.City;
import com.guideafrica.premium.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public City findById(Long id) {
        return cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ville", id));
    }

    public List<City> searchByNom(String nom) {
        return cityRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<City> findByPays(String pays) {
        return cityRepository.findByPaysIgnoreCase(pays);
    }

    public List<City> findByRegion(String region) {
        return cityRepository.findByRegionIgnoreCase(region);
    }

    public City create(City city) {
        return cityRepository.save(city);
    }

    public City update(Long id, City details) {
        City city = findById(id);
        city.setNom(details.getNom());
        city.setPays(details.getPays());
        city.setRegion(details.getRegion());
        city.setDescription(details.getDescription());
        city.setImage(details.getImage());
        city.setLatitude(details.getLatitude());
        city.setLongitude(details.getLongitude());
        return cityRepository.save(city);
    }

    public void delete(Long id) {
        City city = findById(id);
        cityRepository.delete(city);
    }
}
