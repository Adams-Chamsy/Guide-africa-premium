package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Activite;
import com.guideafrica.premium.model.enums.CategorieActivite;
import com.guideafrica.premium.model.enums.DifficulteActivite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ActiviteRepository extends JpaRepository<Activite, Long> {

    Page<Activite> findByActifTrue(Pageable pageable);

    Page<Activite> findByActifTrueAndTitreContainingIgnoreCase(String titre, Pageable pageable);

    Page<Activite> findByActifTrueAndCategorie(CategorieActivite categorie, Pageable pageable);

    Page<Activite> findByActifTrueAndDifficulte(DifficulteActivite difficulte, Pageable pageable);

    Page<Activite> findByActifTrueAndVilleId(Long villeId, Pageable pageable);

    List<Activite> findTop6ByActifTrueOrderByNoteDesc();

    @Query("SELECT a FROM Activite a WHERE a.actif = true " +
           "AND (:titre IS NULL OR LOWER(a.titre) LIKE LOWER(CONCAT('%', :titre, '%'))) " +
           "AND (:categorie IS NULL OR a.categorie = :categorie) " +
           "AND (:difficulte IS NULL OR a.difficulte = :difficulte) " +
           "AND (:villeId IS NULL OR a.ville.id = :villeId) " +
           "AND (:prixMax IS NULL OR a.prix <= :prixMax)")
    Page<Activite> findWithFilters(
            @Param("titre") String titre,
            @Param("categorie") CategorieActivite categorie,
            @Param("difficulte") DifficulteActivite difficulte,
            @Param("villeId") Long villeId,
            @Param("prixMax") BigDecimal prixMax,
            Pageable pageable);
}
