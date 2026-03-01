package com.guideafrica.premium.service;

import com.guideafrica.premium.model.Notification;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.TypeNotification;
import com.guideafrica.premium.repository.NotificationRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UtilisateurRepository utilisateurRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UtilisateurRepository utilisateurRepository) {
        this.notificationRepository = notificationRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public Notification creer(Long userId, String titre, String message, TypeNotification type, String lien) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId).orElse(null);
        if (utilisateur == null) return null;

        Notification notification = new Notification();
        notification.setUtilisateur(utilisateur);
        notification.setTitre(titre);
        notification.setMessage(message);
        notification.setType(type);
        notification.setLien(lien);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotifications(Long userId) {
        return notificationRepository.findByUtilisateurIdOrderByCreatedAtDesc(userId);
    }

    public long countNonLues(Long userId) {
        return notificationRepository.countByUtilisateurIdAndLueFalse(userId);
    }

    @Transactional
    public void marquerLue(Long notifId, Long userId) {
        notificationRepository.findById(notifId).ifPresent(n -> {
            if (n.getUtilisateur().getId().equals(userId)) {
                n.setLue(true);
                notificationRepository.save(n);
            }
        });
    }

    @Transactional
    public void marquerToutesLues(Long userId) {
        notificationRepository.markAllAsRead(userId);
    }
}
