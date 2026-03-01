package com.guideafrica.premium.controller;

import com.guideafrica.premium.dto.AuthResponse;
import com.guideafrica.premium.dto.ConnexionRequest;
import com.guideafrica.premium.dto.ForgotPasswordRequest;
import com.guideafrica.premium.dto.InscriptionRequest;
import com.guideafrica.premium.dto.ResetPasswordRequest;
import com.guideafrica.premium.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> inscrire(@Valid @RequestBody InscriptionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.inscrire(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> connecter(@Valid @RequestBody ConnexionRequest request) {
        return ResponseEntity.ok(authService.connecter(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getProfil(Authentication authentication) {
        return ResponseEntity.ok(authService.getProfilUtilisateur(authentication.getName()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.getEmail());
        return ResponseEntity.ok(Collections.singletonMap("message",
                "Si un compte existe avec cet email, un code de reinitialisation a ete envoye"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(Collections.singletonMap("message",
                "Mot de passe reinitialise avec succes"));
    }
}
