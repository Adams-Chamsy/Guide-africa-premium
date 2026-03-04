package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.CategorieVoiture;
import com.guideafrica.premium.model.enums.TypeCarburant;
import com.guideafrica.premium.model.enums.TypeTransmission;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "voitures_location")
public class VoitureLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;
    private int annee;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imagePrincipale;

    @ElementCollection
    @CollectionTable(name = "voiture_photos", joinColumns = @JoinColumn(name = "voiture_id"))
    @Column(name = "url")
    private List<String> galeriePhotos = new ArrayList<>();

    private BigDecimal prixParJour;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ville_id")
    private City ville;

    private String adresse;

    @Enumerated(EnumType.STRING)
    private CategorieVoiture categorie;

    @Enumerated(EnumType.STRING)
    private TypeCarburant carburant;

    @Enumerated(EnumType.STRING)
    private TypeTransmission transmission;

    private int nombrePlaces;
    private int nombrePortes;
    private boolean climatisation;
    private boolean gps;
    private boolean bluetooth;
    private boolean siegesBebe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire_id")
    private Utilisateur proprietaire;

    private String telephone;
    private String whatsapp;
    private boolean disponible = true;
    private Double note;
    private String kilometrageInclus;

    @Column(columnDefinition = "TEXT")
    private String conditions;

    private boolean actif = true;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        this.dateModification = LocalDateTime.now();
        this.actif = true;
        this.disponible = true;
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateModification = LocalDateTime.now();
    }

    // Transient field for API response
    @Transient
    private String proprietaireNom;

    public String getProprietaireNom() {
        if (proprietaire != null) {
            return proprietaire.getPrenom() + " " + proprietaire.getNom();
        }
        return proprietaireNom;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }

    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }

    public int getAnnee() { return annee; }
    public void setAnnee(int annee) { this.annee = annee; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImagePrincipale() { return imagePrincipale; }
    public void setImagePrincipale(String imagePrincipale) { this.imagePrincipale = imagePrincipale; }

    public List<String> getGaleriePhotos() { return galeriePhotos; }
    public void setGaleriePhotos(List<String> galeriePhotos) { this.galeriePhotos = galeriePhotos; }

    public BigDecimal getPrixParJour() { return prixParJour; }
    public void setPrixParJour(BigDecimal prixParJour) { this.prixParJour = prixParJour; }

    public City getVille() { return ville; }
    public void setVille(City ville) { this.ville = ville; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public CategorieVoiture getCategorie() { return categorie; }
    public void setCategorie(CategorieVoiture categorie) { this.categorie = categorie; }

    public TypeCarburant getCarburant() { return carburant; }
    public void setCarburant(TypeCarburant carburant) { this.carburant = carburant; }

    public TypeTransmission getTransmission() { return transmission; }
    public void setTransmission(TypeTransmission transmission) { this.transmission = transmission; }

    public int getNombrePlaces() { return nombrePlaces; }
    public void setNombrePlaces(int nombrePlaces) { this.nombrePlaces = nombrePlaces; }

    public int getNombrePortes() { return nombrePortes; }
    public void setNombrePortes(int nombrePortes) { this.nombrePortes = nombrePortes; }

    public boolean isClimatisation() { return climatisation; }
    public void setClimatisation(boolean climatisation) { this.climatisation = climatisation; }

    public boolean isGps() { return gps; }
    public void setGps(boolean gps) { this.gps = gps; }

    public boolean isBluetooth() { return bluetooth; }
    public void setBluetooth(boolean bluetooth) { this.bluetooth = bluetooth; }

    public boolean isSiegesBebe() { return siegesBebe; }
    public void setSiegesBebe(boolean siegesBebe) { this.siegesBebe = siegesBebe; }

    public Utilisateur getProprietaire() { return proprietaire; }
    public void setProprietaire(Utilisateur proprietaire) { this.proprietaire = proprietaire; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }

    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }

    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }

    public String getKilometrageInclus() { return kilometrageInclus; }
    public void setKilometrageInclus(String kilometrageInclus) { this.kilometrageInclus = kilometrageInclus; }

    public String getConditions() { return conditions; }
    public void setConditions(String conditions) { this.conditions = conditions; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
