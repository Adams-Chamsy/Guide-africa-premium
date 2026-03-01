package com.guideafrica.premium.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ForgotPasswordRequest {
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit etre valide")
    private String email;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
