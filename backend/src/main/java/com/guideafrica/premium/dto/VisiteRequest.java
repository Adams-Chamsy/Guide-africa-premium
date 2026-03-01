package com.guideafrica.premium.dto;

import com.guideafrica.premium.model.enums.TypeEtablissement;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class VisiteRequest {

    @NotNull(message = "Le type est obligatoire")
    private TypeEtablissement type;

    @NotNull(message = "L'identifiant cible est obligatoire")
    private Long targetId;

    private LocalDate dateVisite;

    @Min(1) @Max(5)
    private Integer note;

    private String commentaire;

    public TypeEtablissement getType() { return type; }
    public void setType(TypeEtablissement type) { this.type = type; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public LocalDate getDateVisite() { return dateVisite; }
    public void setDateVisite(LocalDate dateVisite) { this.dateVisite = dateVisite; }

    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
}
