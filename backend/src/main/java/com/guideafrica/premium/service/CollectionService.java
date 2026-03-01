package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.CollectionItem;
import com.guideafrica.premium.model.UserCollection;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.CollectionItemRepository;
import com.guideafrica.premium.repository.CollectionRepository;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final CollectionItemRepository collectionItemRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    public CollectionService(CollectionRepository collectionRepository,
                             CollectionItemRepository collectionItemRepository,
                             UtilisateurRepository utilisateurRepository,
                             RestaurantRepository restaurantRepository,
                             HotelRepository hotelRepository) {
        this.collectionRepository = collectionRepository;
        this.collectionItemRepository = collectionItemRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<UserCollection> getUserCollections(Long userId) {
        List<UserCollection> collections = collectionRepository.findByUtilisateurIdOrderByCreatedAtDesc(userId);
        for (UserCollection collection : collections) {
            enrichItems(collection.getItems());
        }
        return collections;
    }

    public UserCollection getCollectionById(Long id) {
        UserCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection introuvable"));
        enrichItems(collection.getItems());
        return collection;
    }

    @Transactional
    public UserCollection createCollection(Long userId, String nom, String description, boolean publique) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        UserCollection collection = new UserCollection();
        collection.setNom(nom);
        collection.setDescription(description);
        collection.setPublique(publique);
        collection.setUtilisateur(utilisateur);

        return collectionRepository.save(collection);
    }

    @Transactional
    public UserCollection updateCollection(Long userId, Long collectionId, String nom, String description, boolean publique) {
        UserCollection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection introuvable"));

        if (!collection.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Collection introuvable");
        }

        collection.setNom(nom);
        collection.setDescription(description);
        collection.setPublique(publique);

        return collectionRepository.save(collection);
    }

    @Transactional
    public void deleteCollection(Long userId, Long collectionId) {
        UserCollection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection introuvable"));

        if (!collection.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Collection introuvable");
        }

        collectionRepository.delete(collection);
    }

    @Transactional
    public CollectionItem addItem(Long userId, Long collectionId, TypeEtablissement type, Long targetId) {
        UserCollection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection introuvable"));

        if (!collection.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Collection introuvable");
        }

        if (collectionItemRepository.existsByCollectionIdAndTypeAndTargetId(collectionId, type, targetId)) {
            throw new IllegalStateException("Cet élément est déjà dans la collection");
        }

        CollectionItem item = new CollectionItem();
        item.setCollection(collection);
        item.setType(type);
        item.setTargetId(targetId);

        item = collectionItemRepository.save(item);
        enrichItem(item);
        return item;
    }

    @Transactional
    public void removeItem(Long userId, Long collectionId, Long itemId) {
        UserCollection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection introuvable"));

        if (!collection.getUtilisateur().getId().equals(userId)) {
            throw new ResourceNotFoundException("Collection introuvable");
        }

        CollectionItem item = collectionItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Élément introuvable"));

        if (!item.getCollection().getId().equals(collectionId)) {
            throw new ResourceNotFoundException("Élément introuvable");
        }

        collectionItemRepository.delete(item);
    }

    public List<UserCollection> getPublicCollections() {
        List<UserCollection> collections = collectionRepository.findByPubliqueTrue();
        for (UserCollection collection : collections) {
            enrichItems(collection.getItems());
        }
        return collections;
    }

    private void enrichItems(List<CollectionItem> items) {
        for (CollectionItem item : items) {
            enrichItem(item);
        }
    }

    private void enrichItem(CollectionItem item) {
        if (item.getType() == TypeEtablissement.RESTAURANT) {
            restaurantRepository.findById(item.getTargetId()).ifPresent(r -> {
                item.setNomEtablissement(r.getNom());
                item.setImageEtablissement(r.getImage());
                item.setNoteEtablissement(r.getNote());
                if (r.getVille() != null) {
                    item.setVilleEtablissement(r.getVille().getNom());
                }
            });
        } else if (item.getType() == TypeEtablissement.HOTEL) {
            hotelRepository.findById(item.getTargetId()).ifPresent(h -> {
                item.setNomEtablissement(h.getNom());
                item.setImageEtablissement(h.getImage());
                item.setNoteEtablissement(h.getNote());
                if (h.getVille() != null) {
                    item.setVilleEtablissement(h.getVille().getNom());
                }
            });
        }
    }
}
