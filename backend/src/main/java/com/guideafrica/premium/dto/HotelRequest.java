package com.guideafrica.premium.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class HotelRequest {

    @NotBlank
    @Size(max = 200)
    private String nom;

    @Size(max = 3000)
    private String description;

    @NotBlank
    @Size(max = 500)
    private String adresse;

    @Min(1)
    @Max(5)
    private Integer etoiles;

    @Min(0)
    private Double prixParNuit;

    @Size(max = 500)
    private String image;

    @Size(max = 20)
    private String telephone;

    @Email
    @Size(max = 100)
    private String email;

    @Size(max = 500)
    private String siteWeb;

    @Size(max = 500)
    private String instagram;

    @Size(max = 500)
    private String facebook;

    private List<String> modesPayement;
    private List<String> languesParlees;

    private boolean wifi;
    private boolean parking;
    private boolean piscine;
    private boolean spa;
    private boolean restaurantSurPlace;
    private boolean salleSport;
    private boolean navette;
    private boolean petitDejeunerInclus;
    private boolean animauxAcceptes;
    private boolean climatisation;
    private boolean roomService;
    private boolean conciergerie;

    @Size(max = 10)
    private String checkIn;

    @Size(max = 10)
    private String checkOut;

    @Min(0)
    private Integer nombreChambres;

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

    public Integer getEtoiles() { return etoiles; }
    public void setEtoiles(Integer etoiles) { this.etoiles = etoiles; }

    public Double getPrixParNuit() { return prixParNuit; }
    public void setPrixParNuit(Double prixParNuit) { this.prixParNuit = prixParNuit; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

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

    public boolean isWifi() { return wifi; }
    public void setWifi(boolean wifi) { this.wifi = wifi; }

    public boolean isParking() { return parking; }
    public void setParking(boolean parking) { this.parking = parking; }

    public boolean isPiscine() { return piscine; }
    public void setPiscine(boolean piscine) { this.piscine = piscine; }

    public boolean isSpa() { return spa; }
    public void setSpa(boolean spa) { this.spa = spa; }

    public boolean isRestaurantSurPlace() { return restaurantSurPlace; }
    public void setRestaurantSurPlace(boolean restaurantSurPlace) { this.restaurantSurPlace = restaurantSurPlace; }

    public boolean isSalleSport() { return salleSport; }
    public void setSalleSport(boolean salleSport) { this.salleSport = salleSport; }

    public boolean isNavette() { return navette; }
    public void setNavette(boolean navette) { this.navette = navette; }

    public boolean isPetitDejeunerInclus() { return petitDejeunerInclus; }
    public void setPetitDejeunerInclus(boolean petitDejeunerInclus) { this.petitDejeunerInclus = petitDejeunerInclus; }

    public boolean isAnimauxAcceptes() { return animauxAcceptes; }
    public void setAnimauxAcceptes(boolean animauxAcceptes) { this.animauxAcceptes = animauxAcceptes; }

    public boolean isClimatisation() { return climatisation; }
    public void setClimatisation(boolean climatisation) { this.climatisation = climatisation; }

    public boolean isRoomService() { return roomService; }
    public void setRoomService(boolean roomService) { this.roomService = roomService; }

    public boolean isConciergerie() { return conciergerie; }
    public void setConciergerie(boolean conciergerie) { this.conciergerie = conciergerie; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    public Integer getNombreChambres() { return nombreChambres; }
    public void setNombreChambres(Integer nombreChambres) { this.nombreChambres = nombreChambres; }

    public Long getVilleId() { return villeId; }
    public void setVilleId(Long villeId) { this.villeId = villeId; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
