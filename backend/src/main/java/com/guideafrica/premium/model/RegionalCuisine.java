package com.guideafrica.premium.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "regional_cuisines")
public class RegionalCuisine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false, unique = true)
    private String nom;

    private String region;

    private String pays;

    @Column(length = 3000)
    private String description;

    private String platSignature;

    @ElementCollection
    @CollectionTable(name = "cuisine_ingredients", joinColumns = @JoinColumn(name = "cuisine_id"))
    @Column(name = "ingredient")
    private List<String> ingredients = new ArrayList<>();

    private String image;

    public RegionalCuisine() {}

    public RegionalCuisine(String nom, String region, String pays, String description, String platSignature, List<String> ingredients, String image) {
        this.nom = nom;
        this.region = region;
        this.pays = pays;
        this.description = description;
        this.platSignature = platSignature;
        this.ingredients = ingredients;
        this.image = image;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPlatSignature() { return platSignature; }
    public void setPlatSignature(String platSignature) { this.platSignature = platSignature; }
    public List<String> getIngredients() { return ingredients; }
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
