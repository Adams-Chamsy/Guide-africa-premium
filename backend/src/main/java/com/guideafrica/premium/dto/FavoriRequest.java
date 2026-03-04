package com.guideafrica.premium.dto;

import com.guideafrica.premium.model.enums.TypeEtablissement;

import javax.validation.constraints.NotNull;

public class FavoriRequest {

    @NotNull(message = "Le type est obligatoire")
    private TypeEtablissement type;

    @NotNull(message = "L'identifiant cible est obligatoire")
    private Long targetId;

    public TypeEtablissement getType() { return type; }
    public void setType(TypeEtablissement type) { this.type = type; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }
}
