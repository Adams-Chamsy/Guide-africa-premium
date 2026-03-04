package com.guideafrica.premium.service;

import com.guideafrica.premium.model.UserBadge;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.repository.UserBadgeRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class BadgeService {
    private final UserBadgeRepository badgeRepository;
    private final UtilisateurRepository utilisateurRepository;

    public BadgeService(UserBadgeRepository badgeRepository, UtilisateurRepository utilisateurRepository) {
        this.badgeRepository = badgeRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public List<UserBadge> getUserBadges(Long userId) {
        return badgeRepository.findByUtilisateurId(userId);
    }

    @Transactional
    public List<String> checkAndAwardBadges(Long userId) {
        Utilisateur user = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        List<String> newBadges = new ArrayList<>();

        if (!badgeRepository.existsByUtilisateurIdAndBadgeCode(userId, "CONNAISSEUR")) {
            awardBadge(user, "CONNAISSEUR", "Connaisseur", "Premier avis laisse", "connoisseur");
            newBadges.add("Connaisseur");
        }

        return newBadges;
    }

    private void awardBadge(Utilisateur user, String code, String nom, String description, String icone) {
        UserBadge badge = new UserBadge();
        badge.setUtilisateur(user);
        badge.setBadgeCode(code);
        badge.setBadgeNom(nom);
        badge.setBadgeDescription(description);
        badge.setBadgeIcone(icone);
        badgeRepository.save(badge);
    }
}
