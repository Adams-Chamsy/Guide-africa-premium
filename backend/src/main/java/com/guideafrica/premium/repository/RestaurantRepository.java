package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.enums.StatutEtablissement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByNomContainingIgnoreCase(String nom);
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);
    List<Restaurant> findByNoteGreaterThanEqual(Double note);
    List<Restaurant> findByCategories_Id(Long categoryId);

    // Nouveaux filtres
    List<Restaurant> findByVilleId(Long villeId);
    List<Restaurant> findByVillePaysIgnoreCase(String pays);
    List<Restaurant> findByStatut(StatutEtablissement statut);
    List<Restaurant> findByFourchettePrix(Integer fourchettePrix);
    List<Restaurant> findByHalalTrue();
    List<Restaurant> findByVegetarienFriendlyTrue();
    List<Restaurant> findByOptionsVeganTrue();

    // EntityGraph pour charger les relations LAZY en une seule requete
    @Override
    @EntityGraph(attributePaths = {"ville", "amenities", "categories"})
    Optional<Restaurant> findById(Long id);

    // Pagination (pas d'EntityGraph ici — open-in-view gère le lazy loading, et EntityGraph + pagination + collections cause HHH90003004)
    Page<Restaurant> findAll(Pageable pageable);

    Page<Restaurant> findByNomContainingIgnoreCase(String nom, Pageable pageable);
    Page<Restaurant> findByCuisineContainingIgnoreCase(String cuisine, Pageable pageable);
    Page<Restaurant> findByVilleId(Long villeId, Pageable pageable);

    // Recherche avancée
    @Query("SELECT r FROM Restaurant r WHERE " +
            "(:nom IS NULL OR LOWER(r.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:cuisine IS NULL OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :cuisine, '%'))) AND " +
            "(:noteMin IS NULL OR r.note >= :noteMin) AND " +
            "(:villeId IS NULL OR r.ville.id = :villeId) AND " +
            "(:fourchettePrix IS NULL OR r.fourchettePrix = :fourchettePrix)")
    Page<Restaurant> searchAdvanced(
            @Param("nom") String nom,
            @Param("cuisine") String cuisine,
            @Param("noteMin") Double noteMin,
            @Param("villeId") Long villeId,
            @Param("fourchettePrix") Integer fourchettePrix,
            Pageable pageable);

    long countByVilleId(Long villeId);
    long countByVillePaysIgnoreCase(String pays);
}
