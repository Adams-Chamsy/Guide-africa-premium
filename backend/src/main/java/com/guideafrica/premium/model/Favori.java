package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.TypeEtablissement;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "favoris", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"utilisateur_id", "type", "target_id"})
})
public class Favori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    @JsonBackReference("user-favoris")
    private Utilisateur utilisateur;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeEtablissement type;

    @NotNull
    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @Column(updatable = false)
    private LocalDateTime dateAjout;

    // Transient fields for enriched response
    @Transient
    private String nomEtablissement;
    @Transient
    private String imageEtablissement;
    @Transient
    private Double noteEtablissement;
    @Transient
    private String villeEtablissement;

    @PrePersist
    protected void onCreate() {
        this.dateAjout = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }

    public TypeEtablissement getType() { return type; }
    public void setType(TypeEtablissement type) { this.type = type; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public LocalDateTime getDateAjout() { return dateAjout; }

    public String getNomEtablissement() { return nomEtablissement; }
    public void setNomEtablissement(String nomEtablissement) { this.nomEtablissement = nomEtablissement; }

    public String getImageEtablissement() { return imageEtablissement; }
    public void setImageEtablissement(String imageEtablissement) { this.imageEtablissement = imageEtablissement; }

    public Double getNoteEtablissement() { return noteEtablissement; }
    public void setNoteEtablissement(Double noteEtablissement) { this.noteEtablissement = noteEtablissement; }

    public String getVilleEtablissement() { return villeEtablissement; }
    public void setVilleEtablissement(String villeEtablissement) { this.villeEtablissement = villeEtablissement; }
}
