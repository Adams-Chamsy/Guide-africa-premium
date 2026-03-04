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
@Table(name = "restaurants")
public class Restaurant {

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

    private String cuisine;

    private Double note;

    private String image;

    @Embedded
    private GpsCoordinates coordonneesGps;

    private String telephone;

    private String email;

    private String horaires;

    // --- Nouveaux champs compétiteurs ---

    @Min(1) @Max(4)
    private Integer fourchettePrix; // 1=€, 2=€€, 3=€€€, 4=€€€€

    @Enumerated(EnumType.STRING)
    private StatutEtablissement statut;

    private boolean halal;
    private boolean vegetarienFriendly;
    private boolean optionsVegan;
    private boolean sansGluten;

    private String siteWeb;
    private String instagram;
    private String facebook;

    @ElementCollection
    @CollectionTable(name = "restaurant_modes_paiement", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "mode_paiement")
    private List<String> modesPayement = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "restaurant_langues", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "langue")
    private List<String> languesParlees = new ArrayList<>();

    private String codeVestimentaire;

    private boolean terrasse;
    private boolean wifi;
    private boolean parking;
    private boolean climatisation;
    private boolean sallePrivee;
    private boolean musiqueLive;

    private Integer capacite;

    private boolean actif = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id")
    private City ville;

    @OneToOne(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonManagedReference("restaurant-chef")
    private Chef chef;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("restaurant-menu")
    private List<MenuItem> menuItems = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("restaurant-distinctions")
    private List<Distinction> distinctions = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "restaurant_amenities",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private Set<Amenity> amenities = new HashSet<>();

    // --- Champs existants ---

    @ElementCollection
    @CollectionTable(name = "restaurant_photos", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "photo_url")
    private List<String> galeriePhotos = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "restaurant_categories",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("restaurant-reviews")
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

    public Restaurant() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
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
    public String getHoraires() { return horaires; }
    public void setHoraires(String horaires) { this.horaires = horaires; }
    public Integer getFourchettePrix() { return fourchettePrix; }
    public void setFourchettePrix(Integer fourchettePrix) { this.fourchettePrix = fourchettePrix; }
    public StatutEtablissement getStatut() { return statut; }
    public void setStatut(StatutEtablissement statut) { this.statut = statut; }
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
    public City getVille() { return ville; }
    public void setVille(City ville) { this.ville = ville; }
    public Chef getChef() { return chef; }
    public void setChef(Chef chef) { this.chef = chef; }
    public List<MenuItem> getMenuItems() { return menuItems; }
    public void setMenuItems(List<MenuItem> menuItems) { this.menuItems = menuItems; }
    public List<Distinction> getDistinctions() { return distinctions; }
    public void setDistinctions(List<Distinction> distinctions) { this.distinctions = distinctions; }
    public Set<Amenity> getAmenities() { return amenities; }
    public void setAmenities(Set<Amenity> amenities) { this.amenities = amenities; }
    public List<String> getGaleriePhotos() { return galeriePhotos; }
    public void setGaleriePhotos(List<String> galeriePhotos) { this.galeriePhotos = galeriePhotos; }
    public Set<Category> getCategories() { return categories; }
    public void setCategories(Set<Category> categories) { this.categories = categories; }
    public List<Review> getAvisUtilisateurs() { return avisUtilisateurs; }
    public void setAvisUtilisateurs(List<Review> avisUtilisateurs) { this.avisUtilisateurs = avisUtilisateurs; }
    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
