package com.guideafrica.premium.model;

import javax.persistence.*;
import java.text.Normalizer;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_articles")
public class BlogArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Column(length = 500)
    private String extrait;

    private String imageCouverture;
    private String categorie;
    private String auteur;
    private boolean publie;
    private int vues;
    private LocalDateTime datePublication;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        if (publie && datePublication == null) {
            datePublication = LocalDateTime.now();
        }
        if (titre != null && slug == null) {
            slug = generateSlug(titre);
        }
    }

    @PreUpdate
    protected void onUpdate() {
        dateModification = LocalDateTime.now();
    }

    private String generateSlug(String text) {
        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        return normalized.replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase().replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-").replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getContenu() { return contenu; }
    public void setContenu(String contenu) { this.contenu = contenu; }
    public String getExtrait() { return extrait; }
    public void setExtrait(String extrait) { this.extrait = extrait; }
    public String getImageCouverture() { return imageCouverture; }
    public void setImageCouverture(String imageCouverture) { this.imageCouverture = imageCouverture; }
    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }
    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }
    public boolean isPublie() { return publie; }
    public void setPublie(boolean publie) { this.publie = publie; }
    public int getVues() { return vues; }
    public void setVues(int vues) { this.vues = vues; }
    public LocalDateTime getDatePublication() { return datePublication; }
    public void setDatePublication(LocalDateTime datePublication) { this.datePublication = datePublication; }
    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }
    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
