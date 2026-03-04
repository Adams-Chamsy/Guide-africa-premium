package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.TypeVoyageur;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "L'auteur est obligatoire")
    @Column(nullable = false)
    private String auteur;

    @NotNull(message = "La note est obligatoire")
    @Min(1) @Max(5)
    @Column(nullable = false)
    private Integer note;

    @Column(length = 3000)
    private String commentaire;

    @Column(updatable = false)
    private LocalDateTime dateCreation;

    // --- Nouveaux champs compétiteurs ---

    @Min(1) @Max(5)
    private Integer noteCuisine;

    @Min(1) @Max(5)
    private Integer noteService;

    @Min(1) @Max(5)
    private Integer noteAmbiance;

    @Min(1) @Max(5)
    private Integer noteRapportQualitePrix;

    @Enumerated(EnumType.STRING)
    private TypeVoyageur typeVoyageur;

    private Integer votesUtiles;

    @Column(length = 2000)
    private String reponseProprietaire;

    private LocalDateTime dateReponse;

    @ElementCollection
    @CollectionTable(name = "review_photos", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "photo_url")
    private List<String> photos = new ArrayList<>();

    @Size(max = 200)
    private String titre;

    // --- Relations existantes ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference("restaurant-reviews")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    @JsonBackReference("hotel-reviews")
    private Hotel hotel;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        if (votesUtiles == null) votesUtiles = 0;
    }

    public Review() {}

    public Review(String auteur, Integer note, String commentaire) {
        this.auteur = auteur;
        this.note = note;
        this.commentaire = commentaire;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
    public LocalDateTime getDateCreation() { return dateCreation; }
    public Integer getNoteCuisine() { return noteCuisine; }
    public void setNoteCuisine(Integer noteCuisine) { this.noteCuisine = noteCuisine; }
    public Integer getNoteService() { return noteService; }
    public void setNoteService(Integer noteService) { this.noteService = noteService; }
    public Integer getNoteAmbiance() { return noteAmbiance; }
    public void setNoteAmbiance(Integer noteAmbiance) { this.noteAmbiance = noteAmbiance; }
    public Integer getNoteRapportQualitePrix() { return noteRapportQualitePrix; }
    public void setNoteRapportQualitePrix(Integer noteRapportQualitePrix) { this.noteRapportQualitePrix = noteRapportQualitePrix; }
    public TypeVoyageur getTypeVoyageur() { return typeVoyageur; }
    public void setTypeVoyageur(TypeVoyageur typeVoyageur) { this.typeVoyageur = typeVoyageur; }
    public Integer getVotesUtiles() { return votesUtiles; }
    public void setVotesUtiles(Integer votesUtiles) { this.votesUtiles = votesUtiles; }
    public String getReponseProprietaire() { return reponseProprietaire; }
    public void setReponseProprietaire(String reponseProprietaire) { this.reponseProprietaire = reponseProprietaire; }
    public LocalDateTime getDateReponse() { return dateReponse; }
    public void setDateReponse(LocalDateTime dateReponse) { this.dateReponse = dateReponse; }
    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }
}
