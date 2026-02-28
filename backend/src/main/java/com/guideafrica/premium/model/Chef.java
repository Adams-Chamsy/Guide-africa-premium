package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "chefs")
public class Chef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @Column(length = 3000)
    private String bio;

    private String photo;

    private String specialite;

    private String nationalite;

    private Integer anneesExperience;

    @OneToOne
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference("restaurant-chef")
    private Restaurant restaurant;

    public Chef() {}

    public Chef(String nom, String bio, String photo, String specialite, String nationalite, Integer anneesExperience) {
        this.nom = nom;
        this.bio = bio;
        this.photo = photo;
        this.specialite = specialite;
        this.nationalite = nationalite;
        this.anneesExperience = anneesExperience;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }
    public String getNationalite() { return nationalite; }
    public void setNationalite(String nationalite) { this.nationalite = nationalite; }
    public Integer getAnneesExperience() { return anneesExperience; }
    public void setAnneesExperience(Integer anneesExperience) { this.anneesExperience = anneesExperience; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
}
