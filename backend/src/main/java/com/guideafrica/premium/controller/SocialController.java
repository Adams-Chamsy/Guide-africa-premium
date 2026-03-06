package com.guideafrica.premium.controller;

import com.guideafrica.premium.dto.SocialPostRequest;
import com.guideafrica.premium.model.SocialPost;
import com.guideafrica.premium.service.SocialService;
import com.guideafrica.premium.util.HtmlSanitizer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/social")
public class SocialController {
    private final SocialService socialService;

    public SocialController(SocialService socialService) {
        this.socialService = socialService;
    }

    @GetMapping
    public ResponseEntity<Page<SocialPost>> getFeed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(socialService.getFeed(PageRequest.of(page, size)));
    }

    @PostMapping
    public ResponseEntity<SocialPost> createPost(
            @RequestBody @Valid SocialPostRequest request,
            Authentication authentication) {
        String contenu = HtmlSanitizer.sanitize(request.getContenu());
        return ResponseEntity.ok(socialService.createPost(contenu, null, authentication.getName()));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<SocialPost> likePost(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(socialService.likePost(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        socialService.deletePost(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
