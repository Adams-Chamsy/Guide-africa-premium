package com.guideafrica.premium.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class RestaurantRequest {

    @NotBlank
    @Size(max = 200)
    private String nom;

    @Size(max = 3000)
    private String description;

    @NotBlank
    @Size(max = 500)
    private String adresse;

    @Size(max = 100)
    private String cuisine;

    @Size(max = 500)
    private String image;

    @Size(max = 20)
    private String telephone;

    @Email
    @Size(max = 100)
    private String email;

    @Size(max = 200)
    private String horaires;

    @Min(1)
    @Max(4)
    private Integer fourchettePrix;

    private boolean halal;
    private boolean vegetarienFriendly;
    private boolean optionsVegan;
    private boolean sansGluten;

    @Size(max = 500)
    private String siteWeb;

    @Size(max = 500)
    private String instagram;

    @Size(max = 500)
    private String facebook;

    private List<String> modesPayement;
    private List<String> languesParlees;

    @Size(max = 200)
    private String codeVestimentaire;

    private boolean terrasse;
    private boolean wifi;
    private boolean parking;
    private boolean climatisation;
    private boolean sallePrivee;
    private boolean musiqueLive;

    @Min(0)
    private Integer capacite;

    private Long villeId;

    private Double latitude;
    private Double longitude;

    // Getters and Setters

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHoraires() { return horaires; }
    public void setHoraires(String horaires) { this.horaires = horaires; }

    public Integer getFourchettePrix() { return fourchettePrix; }
    public void setFourchettePrix(Integer fourchettePrix) { this.fourchettePrix = fourchettePrix; }

    public boolean isHalal() { return halal; }
    public void setHalal(boolean halal) { this.halal = halal; }

    public boolean isVegetarienFriendly() { return vegetarienFriendly; }
    public void setVegetarienFriendly(boolean vegetarienFriendly) { this.vegetarienFriendly = vegetarienFriendly; }

    public boolean isOptionsVegan() { return optionsVegan; }
    public void setOptionsVegan(boolean optionsVegan) { this.optionsVegan = optionsVegan; }

    public boolean isSansGluten() { return sansGluten; }
    public void setSansGluten(boolean sansGluten) { this.sansGluten = sansGluten; }

    public String getSiteWeb() { return siteWeb; }
    public void setSiteWeb(String siteWeb) { this.siteWeb = siteWeb; }

    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public List<String> getModesPayement() { return modesPayement; }
    public void setModesPayement(List<String> modesPayement) { this.modesPayement = modesPayement; }

    public List<String> getLanguesParlees() { return languesParlees; }
    public void setLanguesParlees(List<String> languesParlees) { this.languesParlees = languesParlees; }

    public String getCodeVestimentaire() { return codeVestimentaire; }
    public void setCodeVestimentaire(String codeVestimentaire) { this.codeVestimentaire = codeVestimentaire; }

    public boolean isTerrasse() { return terrasse; }
    public void setTerrasse(boolean terrasse) { this.terrasse = terrasse; }

    public boolean isWifi() { return wifi; }
    public void setWifi(boolean wifi) { this.wifi = wifi; }

    public boolean isParking() { return parking; }
    public void setParking(boolean parking) { this.parking = parking; }

    public boolean isClimatisation() { return climatisation; }
    public void setClimatisation(boolean climatisation) { this.climatisation = climatisation; }

    public boolean isSallePrivee() { return sallePrivee; }
    public void setSallePrivee(boolean sallePrivee) { this.sallePrivee = sallePrivee; }

    public boolean isMusiqueLive() { return musiqueLive; }
    public void setMusiqueLive(boolean musiqueLive) { this.musiqueLive = musiqueLive; }

    public Integer getCapacite() { return capacite; }
    public void setCapacite(Integer capacite) { this.capacite = capacite; }

    public Long getVilleId() { return villeId; }
    public void setVilleId(Long villeId) { this.villeId = villeId; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
