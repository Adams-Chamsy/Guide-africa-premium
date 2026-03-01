package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUtilisateurId(Long userId);
    boolean existsByUtilisateurIdAndBadgeCode(Long userId, String badgeCode);
}
