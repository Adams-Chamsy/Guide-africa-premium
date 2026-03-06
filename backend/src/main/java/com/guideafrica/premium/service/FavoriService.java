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
import java.util.Map;
import java.util.stream.Collectors;

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
        enrichFavorisBatch(favoris);
        return favoris;
    }

    public List<Favori> getFavorisByType(Long utilisateurId, TypeEtablissement type) {
        List<Favori> favoris = favoriRepository.findByUtilisateurIdAndType(utilisateurId, type);
        enrichFavorisBatch(favoris);
        return favoris;
    }

    public Favori ajouterFavori(Long utilisateurId, FavoriRequest request) {
        if (favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(
                utilisateurId, request.getType(), request.getTargetId())) {
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

    /**
     * Batch enrichment: collect all IDs per type, fetch in bulk, then map back.
     * This avoids N+1 queries when enriching a list of favorites.
     */
    private void enrichFavorisBatch(List<Favori> favoris) {
        if (favoris.isEmpty()) return;

        // Collect IDs by type
        List<Long> restaurantIds = favoris.stream()
                .filter(f -> f.getType() == TypeEtablissement.RESTAURANT)
                .map(Favori::getTargetId)
                .collect(Collectors.toList());

        List<Long> hotelIds = favoris.stream()
                .filter(f -> f.getType() == TypeEtablissement.HOTEL)
                .map(Favori::getTargetId)
                .collect(Collectors.toList());

        // Batch fetch
        Map<Long, Restaurant> restaurantMap = restaurantIds.isEmpty()
                ? Map.of()
                : restaurantRepository.findAllById(restaurantIds).stream()
                    .collect(Collectors.toMap(Restaurant::getId, r -> r));

        Map<Long, Hotel> hotelMap = hotelIds.isEmpty()
                ? Map.of()
                : hotelRepository.findAllById(hotelIds).stream()
                    .collect(Collectors.toMap(Hotel::getId, h -> h));

        // Enrich from maps
        for (Favori favori : favoris) {
            if (favori.getType() == TypeEtablissement.RESTAURANT) {
                Restaurant r = restaurantMap.get(favori.getTargetId());
                if (r != null) {
                    favori.setNomEtablissement(r.getNom());
                    favori.setImageEtablissement(r.getImage());
                    favori.setNoteEtablissement(r.getNote());
                    if (r.getVille() != null) {
                        favori.setVilleEtablissement(r.getVille().getNom());
                    }
                }
            } else if (favori.getType() == TypeEtablissement.HOTEL) {
                Hotel h = hotelMap.get(favori.getTargetId());
                if (h != null) {
                    favori.setNomEtablissement(h.getNom());
                    favori.setImageEtablissement(h.getImage());
                    favori.setNoteEtablissement(h.getNote());
                    if (h.getVille() != null) {
                        favori.setVilleEtablissement(h.getVille().getNom());
                    }
                }
            }
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
