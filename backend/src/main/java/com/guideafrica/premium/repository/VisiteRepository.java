package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Visite;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {
    List<Visite> findByUtilisateurIdOrderByDateVisiteDesc(Long utilisateurId);
    List<Visite> findByUtilisateurIdAndType(Long utilisateurId, TypeEtablissement type);
    boolean existsByUtilisateurIdAndTypeAndTargetId(Long utilisateurId, TypeEtablissement type, Long targetId);
}
