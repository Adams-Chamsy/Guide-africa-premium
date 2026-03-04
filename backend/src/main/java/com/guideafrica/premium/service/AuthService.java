package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.AuthResponse;
import com.guideafrica.premium.dto.ConnexionRequest;
import com.guideafrica.premium.dto.InscriptionRequest;
import com.guideafrica.premium.exception.AuthentificationException;
import com.guideafrica.premium.exception.EmailDejaUtiliseException;
import com.guideafrica.premium.model.PasswordResetToken;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.RoleUtilisateur;
import com.guideafrica.premium.repository.PasswordResetTokenRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthService(UtilisateurRepository utilisateurRepository,
                       PasswordResetTokenRepository passwordResetTokenRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils,
                       AuthenticationManager authenticationManager,
                       EmailService emailService) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public AuthResponse inscrire(InscriptionRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new EmailDejaUtiliseException(request.getEmail());
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(request.getNom());
        utilisateur.setPrenom(request.getPrenom());
        utilisateur.setEmail(request.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        utilisateur.setRole(RoleUtilisateur.USER);
        utilisateur.setAvatar("https://ui-avatars.com/api/?name=" +
                request.getPrenom() + "+" + request.getNom() +
                "&background=1B6B4A&color=F5F0E8");

        utilisateur = utilisateurRepository.save(utilisateur);

        emailService.envoyerBienvenue(utilisateur.getEmail(), utilisateur.getPrenom());

        String token = jwtUtils.generateToken(utilisateur.getEmail());

        return new AuthResponse(
                token,
                utilisateur.getId(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole().name(),
                utilisateur.getAvatar()
        );
    }

    public AuthResponse connecter(ConnexionRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getMotDePasse()));
        } catch (Exception e) {
            throw new AuthentificationException("Email ou mot de passe incorrect");
        }

        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthentificationException("Utilisateur introuvable"));

        utilisateur.setDernierAcces(LocalDateTime.now());
        utilisateurRepository.save(utilisateur);

        String token = jwtUtils.generateToken(utilisateur.getEmail());

        return new AuthResponse(
                token,
                utilisateur.getId(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole().name(),
                utilisateur.getAvatar()
        );
    }

    public AuthResponse getProfilUtilisateur(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new AuthentificationException("Utilisateur introuvable"));

        return new AuthResponse(
                null,
                utilisateur.getId(),
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole().name(),
                utilisateur.getAvatar()
        );
    }

    @Transactional
    public void forgotPassword(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElse(null);

        // Always return success to avoid email enumeration
        if (utilisateur == null) {
            return;
        }

        // Delete any existing tokens for this user
        passwordResetTokenRepository.deleteByUtilisateurId(utilisateur.getId());

        // Generate 6-digit code
        String code = String.format("%06d", new Random().nextInt(999999));

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(code);
        resetToken.setUtilisateur(utilisateur);
        resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));

        passwordResetTokenRepository.save(resetToken);

        emailService.envoyerReinitialisationMotDePasse(utilisateur.getEmail(), code);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByTokenAndUsedFalse(token)
                .orElseThrow(() -> new AuthentificationException("Code de reinitialisation invalide"));

        if (resetToken.isExpired()) {
            throw new AuthentificationException("Le code de reinitialisation a expire");
        }

        Utilisateur utilisateur = resetToken.getUtilisateur();
        utilisateur.setMotDePasse(passwordEncoder.encode(newPassword));
        utilisateurRepository.save(utilisateur);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }
}
