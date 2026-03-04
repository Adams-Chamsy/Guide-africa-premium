package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.model.enums.TypeReservation;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    @JsonBackReference("user-reservations")
    private Utilisateur utilisateur;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeReservation typeReservation;

    @NotNull
    @Column(nullable = false)
    private Long targetId;

    @NotNull
    private LocalDate dateReservation;

    private LocalTime heureReservation;

    private LocalDate dateCheckIn;

    private LocalDate dateCheckOut;

    @Min(1)
    private Integer nombrePersonnes;

    private Integer nombreChambres;

    @Enumerated(EnumType.STRING)
    private StatutReservation statut;

    @Column(length = 1000)
    private String notesSpeciales;

    private String telephone;

    private String email;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Transient
    private String nomEtablissement;

    @Transient
    private String imageEtablissement;

    @Transient
    private String villeEtablissement;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.statut == null) {
            this.statut = StatutReservation.EN_ATTENTE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }

    public TypeReservation getTypeReservation() { return typeReservation; }
    public void setTypeReservation(TypeReservation typeReservation) { this.typeReservation = typeReservation; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public LocalDate getDateReservation() { return dateReservation; }
    public void setDateReservation(LocalDate dateReservation) { this.dateReservation = dateReservation; }

    public LocalTime getHeureReservation() { return heureReservation; }
    public void setHeureReservation(LocalTime heureReservation) { this.heureReservation = heureReservation; }

    public LocalDate getDateCheckIn() { return dateCheckIn; }
    public void setDateCheckIn(LocalDate dateCheckIn) { this.dateCheckIn = dateCheckIn; }

    public LocalDate getDateCheckOut() { return dateCheckOut; }
    public void setDateCheckOut(LocalDate dateCheckOut) { this.dateCheckOut = dateCheckOut; }

    public Integer getNombrePersonnes() { return nombrePersonnes; }
    public void setNombrePersonnes(Integer nombrePersonnes) { this.nombrePersonnes = nombrePersonnes; }

    public Integer getNombreChambres() { return nombreChambres; }
    public void setNombreChambres(Integer nombreChambres) { this.nombreChambres = nombreChambres; }

    public StatutReservation getStatut() { return statut; }
    public void setStatut(StatutReservation statut) { this.statut = statut; }

    public String getNotesSpeciales() { return notesSpeciales; }
    public void setNotesSpeciales(String notesSpeciales) { this.notesSpeciales = notesSpeciales; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public String getNomEtablissement() { return nomEtablissement; }
    public void setNomEtablissement(String nomEtablissement) { this.nomEtablissement = nomEtablissement; }

    public String getImageEtablissement() { return imageEtablissement; }
    public void setImageEtablissement(String imageEtablissement) { this.imageEtablissement = imageEtablissement; }

    public String getVilleEtablissement() { return villeEtablissement; }
    public void setVilleEtablissement(String villeEtablissement) { this.villeEtablissement = villeEtablissement; }
}
