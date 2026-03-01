package com.guideafrica.premium.service;

import com.guideafrica.premium.model.BlogArticle;
import com.guideafrica.premium.repository.BlogArticleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BlogService {
    private final BlogArticleRepository blogRepository;

    public BlogService(BlogArticleRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public Page<BlogArticle> findAll(Pageable pageable) {
        return blogRepository.findByPublieTrueOrderByDatePublicationDesc(pageable);
    }

    public Page<BlogArticle> findByCategorie(String categorie, Pageable pageable) {
        return blogRepository.findByCategorieAndPublieTrue(categorie, pageable);
    }

    public List<BlogArticle> findPopular() {
        return blogRepository.findTop5ByPublieTrueOrderByVuesDesc();
    }

    @Transactional
    public BlogArticle findBySlug(String slug) {
        BlogArticle article = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Article non trouve"));
        article.setVues(article.getVues() + 1);
        return blogRepository.save(article);
    }

    public BlogArticle create(BlogArticle article) {
        return blogRepository.save(article);
    }

    public BlogArticle update(Long id, BlogArticle data) {
        BlogArticle article = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouve"));
        article.setTitre(data.getTitre());
        article.setContenu(data.getContenu());
        article.setExtrait(data.getExtrait());
        article.setImageCouverture(data.getImageCouverture());
        article.setCategorie(data.getCategorie());
        article.setPublie(data.isPublie());
        return blogRepository.save(article);
    }

    public void delete(Long id) {
        blogRepository.deleteById(id);
    }
}
