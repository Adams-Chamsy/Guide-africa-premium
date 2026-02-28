package com.guideafrica.premium.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @NotBlank(message = "Le pays est obligatoire")
    @Column(nullable = false)
    private String pays;

    private String region;

    @Column(length = 2000)
    private String description;

    private String image;

    private Double latitude;

    private Double longitude;

    public City() {}

    public City(String nom, String pays, String region, String description, String image, Double latitude, Double longitude) {
        this.nom = nom;
        this.pays = pays;
        this.region = region;
        this.description = description;
        this.image = image;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
