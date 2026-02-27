package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false, unique = true)
    private String nom;

    private String description;

    @NotBlank(message = "Le type est obligatoire")
    @Column(nullable = false)
    private String type; // RESTAURANT, HOTEL, BOTH

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Hotel> hotels = new HashSet<>();

    public Category() {}

    public Category(String nom, String description, String type) {
        this.nom = nom;
        this.description = description;
        this.type = type;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Set<Restaurant> getRestaurants() { return restaurants; }
    public void setRestaurants(Set<Restaurant> restaurants) { this.restaurants = restaurants; }

    public Set<Hotel> getHotels() { return hotels; }
    public void setHotels(Set<Hotel> hotels) { this.hotels = hotels; }
}
