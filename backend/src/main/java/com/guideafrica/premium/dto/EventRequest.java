package com.guideafrica.premium.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class EventRequest {

    @NotBlank
    @Size(max = 200)
    private String titre;

    @Size(max = 5000)
    private String description;

    @Size(max = 500)
    private String imageCouverture;

    @Size(max = 200)
    private String lieu;

    @Size(max = 500)
    private String adresse;

    private LocalDateTime dateDebut;

    private LocalDateTime dateFin;

    @Min(0)
    private BigDecimal prix;

    @Min(0)
    private int placesTotal;

    @Size(max = 100)
    private String categorie;

    // Getters and Setters

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageCouverture() { return imageCouverture; }
    public void setImageCouverture(String imageCouverture) { this.imageCouverture = imageCouverture; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }

    public int getPlacesTotal() { return placesTotal; }
    public void setPlacesTotal(int placesTotal) { this.placesTotal = placesTotal; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }
}
