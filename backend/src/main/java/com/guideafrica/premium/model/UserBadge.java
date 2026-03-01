package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_badges")
public class UserBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id")
    @JsonIgnoreProperties({"motDePasse", "reservations", "notifications", "favoris"})
    private Utilisateur utilisateur;

    private String badgeCode;
    private String badgeNom;
    private String badgeDescription;
    private String badgeIcone;
    private LocalDateTime dateObtenu;

    @PrePersist
    protected void onCreate() { dateObtenu = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public String getBadgeCode() { return badgeCode; }
    public void setBadgeCode(String badgeCode) { this.badgeCode = badgeCode; }
    public String getBadgeNom() { return badgeNom; }
    public void setBadgeNom(String badgeNom) { this.badgeNom = badgeNom; }
    public String getBadgeDescription() { return badgeDescription; }
    public void setBadgeDescription(String badgeDescription) { this.badgeDescription = badgeDescription; }
    public String getBadgeIcone() { return badgeIcone; }
    public void setBadgeIcone(String badgeIcone) { this.badgeIcone = badgeIcone; }
    public LocalDateTime getDateObtenu() { return dateObtenu; }
    public void setDateObtenu(LocalDateTime dateObtenu) { this.dateObtenu = dateObtenu; }
}
