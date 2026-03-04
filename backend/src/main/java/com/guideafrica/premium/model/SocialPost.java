package com.guideafrica.premium.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "social_posts")
public class SocialPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contenu;

    private String image;

    private int likes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @Transient
    private String auteurNom;

    @Transient
    private String auteurAvatar;

    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        likes = 0;
    }

    @PostLoad
    private void setTransientFields() {
        if (utilisateur != null) {
            this.auteurNom = utilisateur.getPrenom() + " " + utilisateur.getNom();
            this.auteurAvatar = utilisateur.getAvatar();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContenu() { return contenu; }
    public void setContenu(String contenu) { this.contenu = contenu; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public String getAuteurNom() { return auteurNom; }
    public String getAuteurAvatar() { return auteurAvatar; }
    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }
}
