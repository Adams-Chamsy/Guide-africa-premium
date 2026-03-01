package com.guideafrica.premium.service;

public interface EmailService {
    void envoyerBienvenue(String destinataire, String prenom);
    void envoyerConfirmationReservation(String destinataire, String nomEtablissement, String dateReservation);
    void envoyerReinitialisationMotDePasse(String destinataire, String token);
    void envoyerChangementStatutReservation(String destinataire, String nomEtablissement, String statut);
}
