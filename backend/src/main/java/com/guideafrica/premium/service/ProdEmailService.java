package com.guideafrica.premium.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Profile("prod")
public class ProdEmailService implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(ProdEmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:noreply@guideafrica.com}")
    private String fromAddress;

    public ProdEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void envoyerBienvenue(String destinataire, String prenom) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(destinataire);
            message.setSubject("Bienvenue sur Guide Africa, " + prenom + " !");
            message.setText(
                "Bonjour " + prenom + ",\n\n"
                + "Bienvenue sur Guide Africa Premium ! Votre compte a été créé avec succès.\n\n"
                + "Découvrez les meilleures adresses culinaires et hôtelières d'Afrique.\n\n"
                + "L'équipe Guide Africa"
            );
            mailSender.send(message);
            logger.info("Email de bienvenue envoyé à {}", destinataire);
        } catch (Exception e) {
            logger.error("Erreur envoi email bienvenue à {}: {}", destinataire, e.getMessage());
        }
    }

    @Override
    public void envoyerConfirmationReservation(String destinataire, String nomEtablissement, String dateReservation) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(destinataire);
            message.setSubject("Confirmation de réservation - " + nomEtablissement);
            message.setText(
                "Bonjour,\n\n"
                + "Votre réservation a bien été enregistrée :\n\n"
                + "Établissement : " + nomEtablissement + "\n"
                + "Date : " + dateReservation + "\n\n"
                + "Vous recevrez une confirmation définitive prochainement.\n\n"
                + "L'équipe Guide Africa"
            );
            mailSender.send(message);
            logger.info("Email confirmation réservation envoyé à {}", destinataire);
        } catch (Exception e) {
            logger.error("Erreur envoi email confirmation à {}: {}", destinataire, e.getMessage());
        }
    }

    @Override
    public void envoyerReinitialisationMotDePasse(String destinataire, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(destinataire);
            message.setSubject("Réinitialisation de votre mot de passe - Guide Africa");
            message.setText(
                "Bonjour,\n\n"
                + "Vous avez demandé la réinitialisation de votre mot de passe.\n\n"
                + "Votre code de réinitialisation : " + token + "\n\n"
                + "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.\n\n"
                + "L'équipe Guide Africa"
            );
            mailSender.send(message);
            logger.info("Email réinitialisation MDP envoyé à {}", destinataire);
        } catch (Exception e) {
            logger.error("Erreur envoi email réinitialisation à {}: {}", destinataire, e.getMessage());
        }
    }

    @Override
    public void envoyerChangementStatutReservation(String destinataire, String nomEtablissement, String statut) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(destinataire);
            message.setSubject("Mise à jour de votre réservation - " + nomEtablissement);
            message.setText(
                "Bonjour,\n\n"
                + "Le statut de votre réservation chez " + nomEtablissement + " a été mis à jour.\n\n"
                + "Nouveau statut : " + statut + "\n\n"
                + "L'équipe Guide Africa"
            );
            mailSender.send(message);
            logger.info("Email changement statut envoyé à {}", destinataire);
        } catch (Exception e) {
            logger.error("Erreur envoi email statut à {}: {}", destinataire, e.getMessage());
        }
    }
}
