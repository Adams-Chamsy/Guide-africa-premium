package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.TypeDistinction;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "distinctions")
public class Distinction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Le type de distinction est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeDistinction type;

    private LocalDate dateAttribution;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference("restaurant-distinctions")
    private Restaurant restaurant;

    public Distinction() {}

    public Distinction(TypeDistinction type, LocalDate dateAttribution, String description) {
        this.type = type;
        this.dateAttribution = dateAttribution;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public TypeDistinction getType() { return type; }
    public void setType(TypeDistinction type) { this.type = type; }
    public LocalDate getDateAttribution() { return dateAttribution; }
    public void setDateAttribution(LocalDate dateAttribution) { this.dateAttribution = dateAttribution; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
}
