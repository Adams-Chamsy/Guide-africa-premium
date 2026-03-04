package com.guideafrica.premium.model;

import com.guideafrica.premium.model.enums.CategorieActivite;
import com.guideafrica.premium.model.enums.DifficulteActivite;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "activites")
public class Activite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageCouverture;
    private String lieu;
    private String adresse;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ville_id")
    private City ville;

    @Embedded
    private GpsCoordinates coordonneesGps;

    private BigDecimal prix;
    private String duree;

    @Enumerated(EnumType.STRING)
    private CategorieActivite categorie;

    @Enumerated(EnumType.STRING)
    private DifficulteActivite difficulte;

    private int placesMax;

    @ElementCollection
    @CollectionTable(name = "activite_langues", joinColumns = @JoinColumn(name = "activite_id"))
    @Column(name = "langue")
    private List<String> languesDisponibles = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "activite_inclus", joinColumns = @JoinColumn(name = "activite_id"))
    @Column(name = "element")
    private List<String> inclus = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "activite_non_inclus", joinColumns = @JoinColumn(name = "activite_id"))
    @Column(name = "element")
    private List<String> nonInclus = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "activite_photos", joinColumns = @JoinColumn(name = "activite_id"))
    @Column(name = "url")
    private List<String> galeriePhotos = new ArrayList<>();

    private Double note;
    private String telephone;
    private String email;
    private String siteWeb;
    private boolean actif = true;

    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        this.dateModification = LocalDateTime.now();
        this.actif = true;
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateModification = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public City getVille() { return ville; }
    public void setVille(City ville) { this.ville = ville; }

    public GpsCoordinates getCoordonneesGps() { return coordonneesGps; }
    public void setCoordonneesGps(GpsCoordinates coordonneesGps) { this.coordonneesGps = coordonneesGps; }

    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }

    public String getDuree() { return duree; }
    public void setDuree(String duree) { this.duree = duree; }

    public CategorieActivite getCategorie() { return categorie; }
    public void setCategorie(CategorieActivite categorie) { this.categorie = categorie; }

    public DifficulteActivite getDifficulte() { return difficulte; }
    public void setDifficulte(DifficulteActivite difficulte) { this.difficulte = difficulte; }

    public int getPlacesMax() { return placesMax; }
    public void setPlacesMax(int placesMax) { this.placesMax = placesMax; }

    public List<String> getLanguesDisponibles() { return languesDisponibles; }
    public void setLanguesDisponibles(List<String> languesDisponibles) { this.languesDisponibles = languesDisponibles; }

    public List<String> getInclus() { return inclus; }
    public void setInclus(List<String> inclus) { this.inclus = inclus; }

    public List<String> getNonInclus() { return nonInclus; }
    public void setNonInclus(List<String> nonInclus) { this.nonInclus = nonInclus; }

    public List<String> getGaleriePhotos() { return galeriePhotos; }
    public void setGaleriePhotos(List<String> galeriePhotos) { this.galeriePhotos = galeriePhotos; }

    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSiteWeb() { return siteWeb; }
    public void setSiteWeb(String siteWeb) { this.siteWeb = siteWeb; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
