package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.SocialPost;
import com.guideafrica.premium.service.SocialService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

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
            @RequestBody Map<String, String> body,
            Authentication authentication) {
        String contenu = body.get("contenu");
        String image = body.getOrDefault("image", null);
        return ResponseEntity.ok(socialService.createPost(contenu, image, authentication.getName()));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<SocialPost> likePost(@PathVariable Long id) {
        return ResponseEntity.ok(socialService.likePost(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        socialService.deletePost(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
