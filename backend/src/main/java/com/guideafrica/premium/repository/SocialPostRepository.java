package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.SocialPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SocialPostRepository extends JpaRepository<SocialPost, Long> {
    Page<SocialPost> findAllByOrderByDateCreationDesc(Pageable pageable);
    List<SocialPost> findByUtilisateurIdOrderByDateCreationDesc(Long userId);
}
