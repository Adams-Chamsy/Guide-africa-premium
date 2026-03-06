package com.guideafrica.premium.dto;

import javax.validation.constraints.NotBlank;

public class UpdateStatutRequest {

    @NotBlank
    private String statut;

    // Getters and Setters

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
}
