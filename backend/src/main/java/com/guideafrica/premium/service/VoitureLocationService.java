package com.guideafrica.premium.service;

import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.VoitureLocation;
import com.guideafrica.premium.model.enums.CategorieVoiture;
import com.guideafrica.premium.model.enums.TypeTransmission;
import com.guideafrica.premium.repository.VoitureLocationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class VoitureLocationService {

    private final VoitureLocationRepository voitureRepository;

    public VoitureLocationService(VoitureLocationRepository voitureRepository) {
        this.voitureRepository = voitureRepository;
    }

    public Page<VoitureLocation> findAll(String marque, CategorieVoiture categorie,
                                          TypeTransmission transmission, Long villeId,
                                          BigDecimal prixMax, int page, int size,
                                          String sortBy, String direction) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return voitureRepository.findWithFilters(marque, categorie, transmission, villeId, prixMax, pageable);
    }

    public VoitureLocation findById(Long id) {
        return voitureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voiture non trouvee: " + id));
    }

    public List<VoitureLocation> findByProprietaire(Long proprietaireId) {
        return voitureRepository.findByProprietaireIdAndActifTrue(proprietaireId);
    }

    @Transactional
    public VoitureLocation create(VoitureLocation voiture, Utilisateur proprietaire) {
        voiture.setProprietaire(proprietaire);
        return voitureRepository.save(voiture);
    }

    @Transactional
    public VoitureLocation update(Long id, VoitureLocation details, Long proprietaireId) {
        VoitureLocation voiture = findById(id);
        if (!voiture.getProprietaire().getId().equals(proprietaireId)) {
            throw new RuntimeException("Vous n'etes pas le proprietaire de ce vehicule");
        }
        voiture.setMarque(details.getMarque());
        voiture.setModele(details.getModele());
        voiture.setAnnee(details.getAnnee());
        voiture.setDescription(details.getDescription());
        voiture.setImagePrincipale(details.getImagePrincipale());
        voiture.setGaleriePhotos(details.getGaleriePhotos());
        voiture.setPrixParJour(details.getPrixParJour());
        voiture.setVille(details.getVille());
        voiture.setAdresse(details.getAdresse());
        voiture.setCategorie(details.getCategorie());
        voiture.setCarburant(details.getCarburant());
        voiture.setTransmission(details.getTransmission());
        voiture.setNombrePlaces(details.getNombrePlaces());
        voiture.setNombrePortes(details.getNombrePortes());
        voiture.setClimatisation(details.isClimatisation());
        voiture.setGps(details.isGps());
        voiture.setBluetooth(details.isBluetooth());
        voiture.setSiegesBebe(details.isSiegesBebe());
        voiture.setTelephone(details.getTelephone());
        voiture.setWhatsapp(details.getWhatsapp());
        voiture.setKilometrageInclus(details.getKilometrageInclus());
        voiture.setConditions(details.getConditions());
        voiture.setDisponible(details.isDisponible());
        return voitureRepository.save(voiture);
    }

    @Transactional
    public void delete(Long id, Long proprietaireId) {
        VoitureLocation voiture = findById(id);
        if (!voiture.getProprietaire().getId().equals(proprietaireId)) {
            throw new RuntimeException("Vous n'etes pas le proprietaire de ce vehicule");
        }
        voiture.setActif(false);
        voitureRepository.save(voiture);
    }

    @Transactional
    public VoitureLocation toggleDisponibilite(Long id, Long proprietaireId) {
        VoitureLocation voiture = findById(id);
        if (!voiture.getProprietaire().getId().equals(proprietaireId)) {
            throw new RuntimeException("Vous n'etes pas le proprietaire de ce vehicule");
        }
        voiture.setDisponible(!voiture.isDisponible());
        return voitureRepository.save(voiture);
    }
}
