package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false, unique = true)
    private String nom;

    private String icone;

    @NotBlank(message = "Le type est obligatoire")
    @Column(nullable = false)
    private String type; // RESTAURANT, HOTEL, BOTH

    @ManyToMany(mappedBy = "amenities")
    @JsonIgnore
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany(mappedBy = "amenities")
    @JsonIgnore
    private Set<Hotel> hotels = new HashSet<>();

    public Amenity() {}

    public Amenity(String nom, String icone, String type) {
        this.nom = nom;
        this.icone = icone;
        this.type = type;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Set<Restaurant> getRestaurants() { return restaurants; }
    public void setRestaurants(Set<Restaurant> restaurants) { this.restaurants = restaurants; }
    public Set<Hotel> getHotels() { return hotels; }
    public void setHotels(Set<Hotel> hotels) { this.hotels = hotels; }
}
