package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.BlogArticle;
import com.guideafrica.premium.service.BlogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<Page<BlogArticle>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(required = false) String categorie) {
        Page<BlogArticle> articles = categorie != null
                ? blogService.findByCategorie(categorie, PageRequest.of(page, size))
                : blogService.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<BlogArticle>> getPopular() {
        return ResponseEntity.ok(blogService.findPopular());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogArticle> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.findBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<BlogArticle> create(@RequestBody BlogArticle article) {
        return ResponseEntity.ok(blogService.create(article));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogArticle> update(@PathVariable Long id, @RequestBody BlogArticle article) {
        return ResponseEntity.ok(blogService.update(id, article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
