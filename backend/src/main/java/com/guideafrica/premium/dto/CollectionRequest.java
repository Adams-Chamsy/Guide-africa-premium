package com.guideafrica.premium.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CollectionRequest {

    @NotBlank
    @Size(max = 200)
    private String nom;

    @Size(max = 1000)
    private String description;

    private boolean publique;

    // Getters and Setters

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isPublique() { return publique; }
    public void setPublique(boolean publique) { this.publique = publique; }
}
