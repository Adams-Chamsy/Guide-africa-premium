package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.CategorieMenu;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @Column(length = 1000)
    private String description;

    private Double prix;

    @NotNull(message = "La catégorie est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategorieMenu categorie;

    private boolean signature;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference("restaurant-menu")
    private Restaurant restaurant;

    public MenuItem() {}

    public MenuItem(String nom, String description, Double prix, CategorieMenu categorie, boolean signature) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
        this.signature = signature;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }
    public CategorieMenu getCategorie() { return categorie; }
    public void setCategorie(CategorieMenu categorie) { this.categorie = categorie; }
    public boolean isSignature() { return signature; }
    public void setSignature(boolean signature) { this.signature = signature; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
}
