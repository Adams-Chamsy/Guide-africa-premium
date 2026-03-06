package com.guideafrica.premium.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SocialPostRequest {

    @NotBlank
    @Size(max = 2000)
    private String contenu;

    @Size(max = 50)
    private String type;

    // Getters and Setters

    public String getContenu() { return contenu; }
    public void setContenu(String contenu) { this.contenu = contenu; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
