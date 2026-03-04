package com.guideafrica.premium.dto;

import javax.validation.constraints.Size;

public class ProfilUpdateRequest {
    @Size(max = 50, message = "Le nom ne doit pas depasser 50 caracteres")
    private String nom;

    @Size(max = 50, message = "Le prenom ne doit pas depasser 50 caracteres")
    private String prenom;

    private String telephone;

    private String avatar;

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
}
