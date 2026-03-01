package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.FavoriRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Favori;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.FavoriRepository;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriService {

    private final FavoriRepository favoriRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public FavoriService(FavoriRepository favoriRepository,
                         UtilisateurRepository utilisateurRepository,
                         RestaurantRepository restaurantRepository,
                         HotelRepository hotelRepository) {
        this.favoriRepository = favoriRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<Favori> getFavoris(Long utilisateurId) {
        List<Favori> favoris = favoriRepository.findByUtilisateurId(utilisateurId);
        enrichFavoris(favoris);
        return favoris;
    }

    public List<Favori> getFavorisByType(Long utilisateurId, TypeEtablissement type) {
        List<Favori> favoris = favoriRepository.findByUtilisateurIdAndType(utilisateurId, type);
        enrichFavoris(favoris);
        return favoris;
    }

    public Favori ajouterFavori(Long utilisateurId, FavoriRequest request) {
        if (favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(
                utilisateurId, request.getType(), request.getTargetId())) {
            // Already a favorite, return existing
            return favoriRepository.findByUtilisateurIdAndTypeAndTargetId(
                    utilisateurId, request.getType(), request.getTargetId()).get();
        }

        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        Favori favori = new Favori();
        favori.setUtilisateur(utilisateur);
        favori.setType(request.getType());
        favori.setTargetId(request.getTargetId());

        favori = favoriRepository.save(favori);
        enrichFavori(favori);
        return favori;
    }

    @Transactional
    public void supprimerFavori(Long utilisateurId, Long favoriId) {
        Favori favori = favoriRepository.findById(favoriId)
                .orElseThrow(() -> new ResourceNotFoundException("Favori introuvable"));
        if (!favori.getUtilisateur().getId().equals(utilisateurId)) {
            throw new ResourceNotFoundException("Favori introuvable");
        }
        favoriRepository.delete(favori);
    }

    @Transactional
    public void supprimerFavoriByTarget(Long utilisateurId, TypeEtablissement type, Long targetId) {
        favoriRepository.deleteByUtilisateurIdAndTypeAndTargetId(utilisateurId, type, targetId);
    }

    public boolean isFavori(Long utilisateurId, TypeEtablissement type, Long targetId) {
        return favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(utilisateurId, type, targetId);
    }

    @Transactional
    public List<Favori> syncFavoris(Long utilisateurId, List<FavoriRequest> requests) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        List<Favori> synced = new ArrayList<>();
        for (FavoriRequest request : requests) {
            if (!favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(
                    utilisateurId, request.getType(), request.getTargetId())) {
                Favori favori = new Favori();
                favori.setUtilisateur(utilisateur);
                favori.setType(request.getType());
                favori.setTargetId(request.getTargetId());
                synced.add(favoriRepository.save(favori));
            }
        }
        return synced;
    }

    private void enrichFavoris(List<Favori> favoris) {
        for (Favori favori : favoris) {
            enrichFavori(favori);
        }
    }

    private void enrichFavori(Favori favori) {
        if (favori.getType() == TypeEtablissement.RESTAURANT) {
            restaurantRepository.findById(favori.getTargetId()).ifPresent(r -> {
                favori.setNomEtablissement(r.getNom());
                favori.setImageEtablissement(r.getImage());
                favori.setNoteEtablissement(r.getNote());
                if (r.getVille() != null) {
                    favori.setVilleEtablissement(r.getVille().getNom());
                }
            });
        } else if (favori.getType() == TypeEtablissement.HOTEL) {
            hotelRepository.findById(favori.getTargetId()).ifPresent(h -> {
                favori.setNomEtablissement(h.getNom());
                favori.setImageEtablissement(h.getImage());
                favori.setNoteEtablissement(h.getNote());
                if (h.getVille() != null) {
                    favori.setVilleEtablissement(h.getVille().getNom());
                }
            });
        }
    }
}
