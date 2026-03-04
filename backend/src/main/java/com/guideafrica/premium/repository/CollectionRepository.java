package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionRepository extends JpaRepository<UserCollection, Long> {
    List<UserCollection> findByUtilisateurIdOrderByCreatedAtDesc(Long userId);
    List<UserCollection> findByPubliqueTrue();
}
