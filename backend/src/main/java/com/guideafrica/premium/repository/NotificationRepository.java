package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUtilisateurIdOrderByCreatedAtDesc(Long utilisateurId);
    long countByUtilisateurIdAndLueFalse(Long utilisateurId);

    @Modifying
    @Query("UPDATE Notification n SET n.lue = true WHERE n.utilisateur.id = :userId AND n.lue = false")
    void markAllAsRead(@Param("userId") Long userId);
}
