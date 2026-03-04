package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.AuthResponse;
import com.guideafrica.premium.dto.ConnexionRequest;
import com.guideafrica.premium.dto.InscriptionRequest;
import com.guideafrica.premium.exception.AuthentificationException;
import com.guideafrica.premium.exception.EmailDejaUtiliseException;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.RoleUtilisateur;
import com.guideafrica.premium.repository.UtilisateurRepository;
import com.guideafrica.premium.security.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthService authService;

    private Utilisateur testUser;

    @BeforeEach
    void setUp() {
        testUser = new Utilisateur();
        testUser.setId(1L);
        testUser.setPrenom("Aminata");
        testUser.setNom("Diallo");
        testUser.setEmail("aminata@example.com");
        testUser.setMotDePasse("encodedPassword123");
        testUser.setRole(RoleUtilisateur.USER);
        testUser.setAvatar("https://ui-avatars.com/api/?name=Aminata+Diallo&background=1B6B4A&color=F5F0E8");
        testUser.setActif(true);
    }

    // ========== Tests for connecter (login) ==========

    @Test
    void connecter_withValidCredentials_shouldReturnAuthResponse() {
        ConnexionRequest request = new ConnexionRequest();
        request.setEmail("aminata@example.com");
        request.setMotDePasse("password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken("aminata@example.com", "password123"));
        when(utilisateurRepository.findByEmail("aminata@example.com")).thenReturn(Optional.of(testUser));
        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(testUser);
        when(jwtUtils.generateToken("aminata@example.com")).thenReturn("test.jwt.token");

        AuthResponse response = authService.connecter(request);

        assertNotNull(response);
        assertEquals("test.jwt.token", response.getToken());
        assertEquals("Aminata", response.getPrenom());
        assertEquals("Diallo", response.getNom());
        assertEquals("aminata@example.com", response.getEmail());
        assertEquals("USER", response.getRole());
        assertEquals(1L, response.getId());
        verify(utilisateurRepository).findByEmail("aminata@example.com");
        verify(utilisateurRepository).save(any(Utilisateur.class)); // dernierAcces updated
    }

    @Test
    void connecter_withInvalidCredentials_shouldThrowAuthentificationException() {
        ConnexionRequest request = new ConnexionRequest();
        request.setEmail("aminata@example.com");
        request.setMotDePasse("wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        AuthentificationException exception = assertThrows(AuthentificationException.class, () ->
                authService.connecter(request)
        );
        assertEquals("Email ou mot de passe incorrect", exception.getMessage());
    }

    @Test
    void connecter_withNonExistentUser_shouldThrowAuthentificationException() {
        ConnexionRequest request = new ConnexionRequest();
        request.setEmail("unknown@example.com");
        request.setMotDePasse("password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken("unknown@example.com", "password123"));
        when(utilisateurRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        AuthentificationException exception = assertThrows(AuthentificationException.class, () ->
                authService.connecter(request)
        );
        assertEquals("Utilisateur introuvable", exception.getMessage());
    }

    @Test
    void connecter_shouldUpdateDernierAcces() {
        ConnexionRequest request = new ConnexionRequest();
        request.setEmail("aminata@example.com");
        request.setMotDePasse("password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken("aminata@example.com", "password123"));
        when(utilisateurRepository.findByEmail("aminata@example.com")).thenReturn(Optional.of(testUser));
        when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(jwtUtils.generateToken("aminata@example.com")).thenReturn("token");

        authService.connecter(request);

        assertNotNull(testUser.getDernierAcces());
        verify(utilisateurRepository).save(testUser);
    }

    // ========== Tests for inscrire (register) ==========

    @Test
    void inscrire_withNewEmail_shouldReturnAuthResponse() {
        InscriptionRequest request = new InscriptionRequest();
        request.setPrenom("Fatou");
        request.setNom("Sow");
        request.setEmail("fatou@example.com");
        request.setMotDePasse("password123");

        when(utilisateurRepository.existsByEmail("fatou@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(invocation -> {
            Utilisateur u = invocation.getArgument(0);
            u.setId(2L);
            return u;
        });
        when(jwtUtils.generateToken("fatou@example.com")).thenReturn("new.jwt.token");

        AuthResponse response = authService.inscrire(request);

        assertNotNull(response);
        assertEquals("new.jwt.token", response.getToken());
        assertEquals("Fatou", response.getPrenom());
        assertEquals("Sow", response.getNom());
        assertEquals("fatou@example.com", response.getEmail());
        assertEquals("USER", response.getRole());
        assertEquals(2L, response.getId());
        verify(utilisateurRepository).save(any(Utilisateur.class));
        verify(emailService).envoyerBienvenue("fatou@example.com", "Fatou");
    }

    @Test
    void inscrire_withExistingEmail_shouldThrowEmailDejaUtiliseException() {
        InscriptionRequest request = new InscriptionRequest();
        request.setPrenom("Test");
        request.setNom("User");
        request.setEmail("aminata@example.com");
        request.setMotDePasse("password123");

        when(utilisateurRepository.existsByEmail("aminata@example.com")).thenReturn(true);

        assertThrows(EmailDejaUtiliseException.class, () ->
                authService.inscrire(request)
        );
        verify(utilisateurRepository, never()).save(any());
        verify(emailService, never()).envoyerBienvenue(anyString(), anyString());
    }

    @Test
    void inscrire_shouldEncodePassword() {
        InscriptionRequest request = new InscriptionRequest();
        request.setPrenom("Kofi");
        request.setNom("Mensah");
        request.setEmail("kofi@example.com");
        request.setMotDePasse("plainPassword");

        when(utilisateurRepository.existsByEmail("kofi@example.com")).thenReturn(false);
        when(passwordEncoder.encode("plainPassword")).thenReturn("$2a$encodedPassword");
        when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(invocation -> {
            Utilisateur u = invocation.getArgument(0);
            u.setId(3L);
            return u;
        });
        when(jwtUtils.generateToken("kofi@example.com")).thenReturn("token");

        authService.inscrire(request);

        verify(passwordEncoder).encode("plainPassword");
        verify(utilisateurRepository).save(argThat(user ->
                "$2a$encodedPassword".equals(user.getMotDePasse())
        ));
    }

    @Test
    void inscrire_shouldSetDefaultRoleToUser() {
        InscriptionRequest request = new InscriptionRequest();
        request.setPrenom("Awa");
        request.setNom("Keita");
        request.setEmail("awa@example.com");
        request.setMotDePasse("password123");

        when(utilisateurRepository.existsByEmail("awa@example.com")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(invocation -> {
            Utilisateur u = invocation.getArgument(0);
            u.setId(4L);
            return u;
        });
        when(jwtUtils.generateToken("awa@example.com")).thenReturn("token");

        authService.inscrire(request);

        verify(utilisateurRepository).save(argThat(user ->
                RoleUtilisateur.USER.equals(user.getRole())
        ));
    }

    @Test
    void inscrire_shouldGenerateAvatarUrl() {
        InscriptionRequest request = new InscriptionRequest();
        request.setPrenom("Moussa");
        request.setNom("Traore");
        request.setEmail("moussa@example.com");
        request.setMotDePasse("password123");

        when(utilisateurRepository.existsByEmail("moussa@example.com")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(invocation -> {
            Utilisateur u = invocation.getArgument(0);
            u.setId(5L);
            return u;
        });
        when(jwtUtils.generateToken("moussa@example.com")).thenReturn("token");

        authService.inscrire(request);

        verify(utilisateurRepository).save(argThat(user ->
                user.getAvatar() != null && user.getAvatar().contains("Moussa") && user.getAvatar().contains("Traore")
        ));
    }

    // ========== Tests for getProfilUtilisateur ==========

    @Test
    void getProfilUtilisateur_withExistingEmail_shouldReturnAuthResponse() {
        when(utilisateurRepository.findByEmail("aminata@example.com")).thenReturn(Optional.of(testUser));

        AuthResponse response = authService.getProfilUtilisateur("aminata@example.com");

        assertNotNull(response);
        assertNull(response.getToken());
        assertEquals(1L, response.getId());
        assertEquals("Aminata", response.getPrenom());
        assertEquals("Diallo", response.getNom());
        assertEquals("aminata@example.com", response.getEmail());
        assertEquals("USER", response.getRole());
    }

    @Test
    void getProfilUtilisateur_withNonExistentEmail_shouldThrowException() {
        when(utilisateurRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(AuthentificationException.class, () ->
                authService.getProfilUtilisateur("unknown@example.com")
        );
    }
}
