package com.guideafrica.premium.dto;

import com.guideafrica.premium.model.Utilisateur;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Utilisateur.
 * Excludes sensitive fields (motDePasse) and heavy relations
 * (favoris, visites, reservations, notifications, collections).
 */
public class UserDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String role;
    private String telephone;
    private String avatar;
    private boolean actif;
    private LocalDateTime dateInscription;
    private int pointsFidelite;

    /**
     * Factory method that maps from a Utilisateur entity to a UserDTO.
     *
     * @param u the Utilisateur entity
     * @return a UserDTO with the relevant fields populated
     */
    public static UserDTO from(Utilisateur u) {
        UserDTO dto = new UserDTO();
        dto.setId(u.getId());
        dto.setNom(u.getNom());
        dto.setPrenom(u.getPrenom());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole() != null ? u.getRole().name() : null);
        dto.setTelephone(u.getTelephone());
        dto.setAvatar(u.getAvatar());
        dto.setActif(u.isActif());
        dto.setDateInscription(u.getDateInscription());
        dto.setPointsFidelite(u.getPointsFidelite());
        return dto;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }

    public int getPointsFidelite() { return pointsFidelite; }
    public void setPointsFidelite(int pointsFidelite) { this.pointsFidelite = pointsFidelite; }
}
