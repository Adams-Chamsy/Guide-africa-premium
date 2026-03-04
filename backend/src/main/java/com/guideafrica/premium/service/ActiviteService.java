package com.guideafrica.premium.service;

import com.guideafrica.premium.model.Activite;
import com.guideafrica.premium.model.enums.CategorieActivite;
import com.guideafrica.premium.model.enums.DifficulteActivite;
import com.guideafrica.premium.repository.ActiviteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ActiviteService {

    private final ActiviteRepository activiteRepository;

    public ActiviteService(ActiviteRepository activiteRepository) {
        this.activiteRepository = activiteRepository;
    }

    public Page<Activite> findAll(String titre, CategorieActivite categorie,
                                   DifficulteActivite difficulte, Long villeId,
                                   BigDecimal prixMax, int page, int size,
                                   String sortBy, String direction) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return activiteRepository.findWithFilters(titre, categorie, difficulte, villeId, prixMax, pageable);
    }

    public Activite findById(Long id) {
        return activiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activite non trouvee: " + id));
    }

    public List<Activite> findTopRated() {
        return activiteRepository.findTop6ByActifTrueOrderByNoteDesc();
    }

    @Transactional
    public Activite create(Activite activite) {
        return activiteRepository.save(activite);
    }

    @Transactional
    public Activite update(Long id, Activite details) {
        Activite activite = findById(id);
        activite.setTitre(details.getTitre());
        activite.setDescription(details.getDescription());
        activite.setImageCouverture(details.getImageCouverture());
        activite.setLieu(details.getLieu());
        activite.setAdresse(details.getAdresse());
        activite.setVille(details.getVille());
        activite.setCoordonneesGps(details.getCoordonneesGps());
        activite.setPrix(details.getPrix());
        activite.setDuree(details.getDuree());
        activite.setCategorie(details.getCategorie());
        activite.setDifficulte(details.getDifficulte());
        activite.setPlacesMax(details.getPlacesMax());
        activite.setLanguesDisponibles(details.getLanguesDisponibles());
        activite.setInclus(details.getInclus());
        activite.setNonInclus(details.getNonInclus());
        activite.setGaleriePhotos(details.getGaleriePhotos());
        activite.setTelephone(details.getTelephone());
        activite.setEmail(details.getEmail());
        activite.setSiteWeb(details.getSiteWeb());
        return activiteRepository.save(activite);
    }

    @Transactional
    public void delete(Long id) {
        Activite activite = findById(id);
        activite.setActif(false);
        activiteRepository.save(activite);
    }
}
