package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Favori;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriRepository extends JpaRepository<Favori, Long> {
    List<Favori> findByUtilisateurId(Long utilisateurId);
    List<Favori> findByUtilisateurIdAndType(Long utilisateurId, TypeEtablissement type);
    Optional<Favori> findByUtilisateurIdAndTypeAndTargetId(Long utilisateurId, TypeEtablissement type, Long targetId);
    boolean existsByUtilisateurIdAndTypeAndTargetId(Long utilisateurId, TypeEtablissement type, Long targetId);
    void deleteByUtilisateurIdAndTypeAndTargetId(Long utilisateurId, TypeEtablissement type, Long targetId);
}
