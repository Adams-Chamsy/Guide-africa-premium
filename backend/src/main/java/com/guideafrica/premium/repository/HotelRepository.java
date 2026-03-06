package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Hotel;
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
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByNomContainingIgnoreCase(String nom);
    List<Hotel> findByEtoilesGreaterThanEqual(Integer etoiles);
    List<Hotel> findByPrixParNuitLessThanEqual(Double prix);
    List<Hotel> findByCategories_Id(Long categoryId);

    // Nouveaux filtres
    List<Hotel> findByVilleId(Long villeId);
    List<Hotel> findByVillePaysIgnoreCase(String pays);
    List<Hotel> findByStatut(StatutEtablissement statut);
    List<Hotel> findByPiscineTrue();
    List<Hotel> findBySpaTrue();
    List<Hotel> findByPetitDejeunerInclusTrue();

    // EntityGraph pour charger les relations LAZY en une seule requete
    @Override
    @EntityGraph(attributePaths = {"ville", "amenities", "categories"})
    Optional<Hotel> findById(Long id);

    // Pagination (pas d'EntityGraph ici — open-in-view gère le lazy loading, et EntityGraph + pagination + collections cause HHH90003004)
    Page<Hotel> findAll(Pageable pageable);

    Page<Hotel> findByNomContainingIgnoreCase(String nom, Pageable pageable);
    Page<Hotel> findByVilleId(Long villeId, Pageable pageable);

    // Recherche avancée
    @Query("SELECT h FROM Hotel h WHERE " +
            "(:nom IS NULL OR LOWER(h.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:etoilesMin IS NULL OR h.etoiles >= :etoilesMin) AND " +
            "(:prixMax IS NULL OR h.prixParNuit <= :prixMax) AND " +
            "(:villeId IS NULL OR h.ville.id = :villeId) AND " +
            "(:noteMin IS NULL OR h.note >= :noteMin)")
    Page<Hotel> searchAdvanced(
            @Param("nom") String nom,
            @Param("etoilesMin") Integer etoilesMin,
            @Param("prixMax") Double prixMax,
            @Param("villeId") Long villeId,
            @Param("noteMin") Double noteMin,
            Pageable pageable);

    long countByVilleId(Long villeId);
    long countByVillePaysIgnoreCase(String pays);
}
