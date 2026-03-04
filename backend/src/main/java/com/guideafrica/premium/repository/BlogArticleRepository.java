package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.BlogArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogArticleRepository extends JpaRepository<BlogArticle, Long> {
    Optional<BlogArticle> findBySlug(String slug);
    Page<BlogArticle> findByPublieTrueOrderByDatePublicationDesc(Pageable pageable);
    Page<BlogArticle> findByCategorieAndPublieTrue(String categorie, Pageable pageable);
    List<BlogArticle> findTop5ByPublieTrueOrderByVuesDesc();
}
