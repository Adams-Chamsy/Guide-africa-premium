package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.NewsletterSubscription;
import com.guideafrica.premium.repository.NewsletterRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/newsletter")
public class NewsletterController {
    private final NewsletterRepository newsletterRepository;

    public NewsletterController(NewsletterRepository newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String prenom = body.getOrDefault("prenom", "");
        if (newsletterRepository.existsByEmail(email)) {
            return ResponseEntity.ok(Map.of("message", "Deja inscrit"));
        }
        NewsletterSubscription sub = new NewsletterSubscription();
        sub.setEmail(email);
        sub.setPrenom(prenom);
        newsletterRepository.save(sub);
        return ResponseEntity.ok(Map.of("message", "Inscription reussie"));
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<Map<String, String>> unsubscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        newsletterRepository.findByEmail(email).ifPresent(sub -> {
            sub.setActif(false);
            newsletterRepository.save(sub);
        });
        return ResponseEntity.ok(Map.of("message", "Desinscription reussie"));
    }
}
