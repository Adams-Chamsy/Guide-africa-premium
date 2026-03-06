package com.guideafrica.premium.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class ReviewRequest {

    @NotBlank
    @Size(max = 100)
    private String auteur;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer note;

    @Size(max = 3000)
    private String commentaire;

    @Size(max = 200)
    private String titre;

    private String typeVoyageur;

    @Min(1)
    @Max(5)
    private Integer noteCuisine;

    @Min(1)
    @Max(5)
    private Integer noteService;

    @Min(1)
    @Max(5)
    private Integer noteAmbiance;

    @Min(1)
    @Max(5)
    private Integer noteRapportQualitePrix;

    private List<String> photos;

    // Getters and Setters

    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }

    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getTypeVoyageur() { return typeVoyageur; }
    public void setTypeVoyageur(String typeVoyageur) { this.typeVoyageur = typeVoyageur; }

    public Integer getNoteCuisine() { return noteCuisine; }
    public void setNoteCuisine(Integer noteCuisine) { this.noteCuisine = noteCuisine; }

    public Integer getNoteService() { return noteService; }
    public void setNoteService(Integer noteService) { this.noteService = noteService; }

    public Integer getNoteAmbiance() { return noteAmbiance; }
    public void setNoteAmbiance(Integer noteAmbiance) { this.noteAmbiance = noteAmbiance; }

    public Integer getNoteRapportQualitePrix() { return noteRapportQualitePrix; }
    public void setNoteRapportQualitePrix(Integer noteRapportQualitePrix) { this.noteRapportQualitePrix = noteRapportQualitePrix; }

    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }
}
