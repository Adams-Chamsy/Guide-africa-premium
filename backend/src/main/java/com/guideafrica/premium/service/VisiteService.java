package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.VisiteRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.Visite;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.repository.VisiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisiteService {

    private final VisiteRepository visiteRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public VisiteService(VisiteRepository visiteRepository,
                         UtilisateurRepository utilisateurRepository,
                         RestaurantRepository restaurantRepository,
                         HotelRepository hotelRepository) {
        this.visiteRepository = visiteRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<Visite> getVisites(Long utilisateurId) {
        List<Visite> visites = visiteRepository.findByUtilisateurIdOrderByDateVisiteDesc(utilisateurId);
        enrichVisites(visites);
        return visites;
    }

    public List<Visite> getVisitesByType(Long utilisateurId, TypeEtablissement type) {
        List<Visite> visites = visiteRepository.findByUtilisateurIdAndType(utilisateurId, type);
        enrichVisites(visites);
        return visites;
    }

    public Visite ajouterVisite(Long utilisateurId, VisiteRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        Visite visite = new Visite();
        visite.setUtilisateur(utilisateur);
        visite.setType(request.getType());
        visite.setTargetId(request.getTargetId());
        visite.setDateVisite(request.getDateVisite());
        visite.setNote(request.getNote());
        visite.setCommentaire(request.getCommentaire());

        visite = visiteRepository.save(visite);
        enrichVisite(visite);
        return visite;
    }

    public boolean isVisite(Long utilisateurId, TypeEtablissement type, Long targetId) {
        return visiteRepository.existsByUtilisateurIdAndTypeAndTargetId(utilisateurId, type, targetId);
    }

    private void enrichVisites(List<Visite> visites) {
        for (Visite visite : visites) {
            enrichVisite(visite);
        }
    }

    private void enrichVisite(Visite visite) {
        if (visite.getType() == TypeEtablissement.RESTAURANT) {
            restaurantRepository.findById(visite.getTargetId()).ifPresent(r -> {
                visite.setNomEtablissement(r.getNom());
                visite.setImageEtablissement(r.getImage());
            });
        } else if (visite.getType() == TypeEtablissement.HOTEL) {
            hotelRepository.findById(visite.getTargetId()).ifPresent(h -> {
                visite.setNomEtablissement(h.getNom());
                visite.setImageEtablissement(h.getImage());
            });
        }
    }
}
