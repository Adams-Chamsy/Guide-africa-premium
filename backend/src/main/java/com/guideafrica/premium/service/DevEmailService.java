package com.guideafrica.premium.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class DevEmailService implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(DevEmailService.class);

    @Override
    public void envoyerBienvenue(String destinataire, String prenom) {
        logger.info("📧 [DEV EMAIL] Bienvenue envoyé à {} - Bonjour {} ! Bienvenue sur Guide Africa Premium.", destinataire, prenom);
    }

    @Override
    public void envoyerConfirmationReservation(String destinataire, String nomEtablissement, String dateReservation) {
        logger.info("📧 [DEV EMAIL] Confirmation réservation envoyée à {} - {} le {}", destinataire, nomEtablissement, dateReservation);
    }

    @Override
    public void envoyerReinitialisationMotDePasse(String destinataire, String token) {
        logger.info("📧 [DEV EMAIL] Réinitialisation mot de passe envoyée à {} - Token: {}", destinataire, token);
    }

    @Override
    public void envoyerChangementStatutReservation(String destinataire, String nomEtablissement, String statut) {
        logger.info("📧 [DEV EMAIL] Changement statut réservation envoyé à {} - {} : {}", destinataire, nomEtablissement, statut);
    }
}
