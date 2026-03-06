package com.guideafrica.premium.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public class ActiviteRequest {

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

    private Long villeId;

    private Double latitude;
    private Double longitude;

    @Min(0)
    private BigDecimal prix;

    @Size(max = 100)
    private String duree;

    private String categorie;

    private String difficulte;

    @Min(0)
    private int placesMax;

    private List<String> languesDisponibles;
    private List<String> inclus;
    private List<String> nonInclus;

    @Size(max = 20)
    private String telephone;

    @Email
    @Size(max = 100)
    private String email;

    @Size(max = 500)
    private String siteWeb;

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

    public Long getVilleId() { return villeId; }
    public void setVilleId(Long villeId) { this.villeId = villeId; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }

    public String getDuree() { return duree; }
    public void setDuree(String duree) { this.duree = duree; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public String getDifficulte() { return difficulte; }
    public void setDifficulte(String difficulte) { this.difficulte = difficulte; }

    public int getPlacesMax() { return placesMax; }
    public void setPlacesMax(int placesMax) { this.placesMax = placesMax; }

    public List<String> getLanguesDisponibles() { return languesDisponibles; }
    public void setLanguesDisponibles(List<String> languesDisponibles) { this.languesDisponibles = languesDisponibles; }

    public List<String> getInclus() { return inclus; }
    public void setInclus(List<String> inclus) { this.inclus = inclus; }

    public List<String> getNonInclus() { return nonInclus; }
    public void setNonInclus(List<String> nonInclus) { this.nonInclus = nonInclus; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSiteWeb() { return siteWeb; }
    public void setSiteWeb(String siteWeb) { this.siteWeb = siteWeb; }
}
