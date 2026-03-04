package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.guideafrica.premium.model.enums.StatutEtablissement;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @Column(length = 3000)
    private String description;

    @NotBlank(message = "L'adresse est obligatoire")
    @Column(nullable = false)
    private String adresse;

    @Min(1) @Max(5)
    private Integer etoiles;

    private Double prixParNuit;

    private Double note;

    private String image;

    @Embedded
    private GpsCoordinates coordonneesGps;

    private String telephone;

    private String email;

    // --- Nouveaux champs compétiteurs ---

    @Enumerated(EnumType.STRING)
    private StatutEtablissement statut;

    private String siteWeb;
    private String instagram;
    private String facebook;

    @ElementCollection
    @CollectionTable(name = "hotel_modes_paiement", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "mode_paiement")
    private List<String> modesPayement = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "hotel_langues", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "langue")
    private List<String> languesParlees = new ArrayList<>();

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

    private String checkIn;  // ex: "14:00"
    private String checkOut; // ex: "12:00"

    private Integer nombreChambres;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id")
    private City ville;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "hotel_amenities",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private Set<Amenity> amenities = new HashSet<>();

    // --- Champs existants ---

    @ElementCollection
    @CollectionTable(name = "hotel_photos", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "photo_url")
    private List<String> galeriePhotos = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "hotel_categories",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("hotel-reviews")
    private List<Review> avisUtilisateurs = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (statut == null) statut = StatutEtablissement.OUVERT;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Hotel() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public GpsCoordinates getCoordonneesGps() { return coordonneesGps; }
    public void setCoordonneesGps(GpsCoordinates coordonneesGps) { this.coordonneesGps = coordonneesGps; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public StatutEtablissement getStatut() { return statut; }
    public void setStatut(StatutEtablissement statut) { this.statut = statut; }
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
    public City getVille() { return ville; }
    public void setVille(City ville) { this.ville = ville; }
    public Set<Amenity> getAmenities() { return amenities; }
    public void setAmenities(Set<Amenity> amenities) { this.amenities = amenities; }
    public List<String> getGaleriePhotos() { return galeriePhotos; }
    public void setGaleriePhotos(List<String> galeriePhotos) { this.galeriePhotos = galeriePhotos; }
    public Set<Category> getCategories() { return categories; }
    public void setCategories(Set<Category> categories) { this.categories = categories; }
    public List<Review> getAvisUtilisateurs() { return avisUtilisateurs; }
    public void setAvisUtilisateurs(List<Review> avisUtilisateurs) { this.avisUtilisateurs = avisUtilisateurs; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
