package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.VoitureLocation;
import com.guideafrica.premium.model.enums.CategorieVoiture;
import com.guideafrica.premium.model.enums.TypeTransmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface VoitureLocationRepository extends JpaRepository<VoitureLocation, Long> {

    Page<VoitureLocation> findByActifTrueAndDisponibleTrue(Pageable pageable);

    List<VoitureLocation> findByProprietaireIdAndActifTrue(Long proprietaireId);

    @Query("SELECT v FROM VoitureLocation v WHERE v.actif = true AND v.disponible = true " +
           "AND (:marque IS NULL OR LOWER(v.marque) LIKE LOWER(CONCAT('%', :marque, '%')) " +
           "    OR LOWER(v.modele) LIKE LOWER(CONCAT('%', :marque, '%'))) " +
           "AND (:categorie IS NULL OR v.categorie = :categorie) " +
           "AND (:transmission IS NULL OR v.transmission = :transmission) " +
           "AND (:villeId IS NULL OR v.ville.id = :villeId) " +
           "AND (:prixMax IS NULL OR v.prixParJour <= :prixMax)")
    Page<VoitureLocation> findWithFilters(
            @Param("marque") String marque,
            @Param("categorie") CategorieVoiture categorie,
            @Param("transmission") TypeTransmission transmission,
            @Param("villeId") Long villeId,
            @Param("prixMax") BigDecimal prixMax,
            Pageable pageable);
}
