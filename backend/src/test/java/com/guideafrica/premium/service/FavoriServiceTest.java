package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.FavoriRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Favori;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.RoleUtilisateur;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import com.guideafrica.premium.repository.FavoriRepository;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FavoriServiceTest {

    @Mock
    private FavoriRepository favoriRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private HotelRepository hotelRepository;

    @InjectMocks
    private FavoriService favoriService;

    private Utilisateur testUser;

    @BeforeEach
    void setUp() {
        testUser = new Utilisateur();
        testUser.setId(1L);
        testUser.setPrenom("Aminata");
        testUser.setNom("Diallo");
        testUser.setEmail("aminata@example.com");
        testUser.setRole(RoleUtilisateur.USER);
    }

    // ========== Tests for getFavoris ==========

    @Test
    void getFavoris_shouldReturnUserFavorites() {
        Favori f1 = new Favori();
        f1.setId(1L);
        f1.setType(TypeEtablissement.RESTAURANT);
        f1.setTargetId(10L);

        Favori f2 = new Favori();
        f2.setId(2L);
        f2.setType(TypeEtablissement.HOTEL);
        f2.setTargetId(20L);

        when(favoriRepository.findByUtilisateurId(1L)).thenReturn(Arrays.asList(f1, f2));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());
        when(hotelRepository.findById(20L)).thenReturn(Optional.empty());

        List<Favori> results = favoriService.getFavoris(1L);

        assertNotNull(results);
        assertEquals(2, results.size());
        verify(favoriRepository).findByUtilisateurId(1L);
    }

    @Test
    void getFavoris_withNoFavorites_shouldReturnEmptyList() {
        when(favoriRepository.findByUtilisateurId(1L)).thenReturn(List.of());

        List<Favori> results = favoriService.getFavoris(1L);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    // ========== Tests for getFavorisByType ==========

    @Test
    void getFavorisByType_shouldReturnFilteredFavorites() {
        Favori f1 = new Favori();
        f1.setId(1L);
        f1.setType(TypeEtablissement.RESTAURANT);
        f1.setTargetId(10L);

        when(favoriRepository.findByUtilisateurIdAndType(1L, TypeEtablissement.RESTAURANT))
                .thenReturn(List.of(f1));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        List<Favori> results = favoriService.getFavorisByType(1L, TypeEtablissement.RESTAURANT);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals(TypeEtablissement.RESTAURANT, results.get(0).getType());
    }

    // ========== Tests for ajouterFavori ==========

    @Test
    void ajouterFavori_withNewFavorite_shouldCreateAndReturn() {
        FavoriRequest request = new FavoriRequest();
        request.setType(TypeEtablissement.RESTAURANT);
        request.setTargetId(10L);

        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(false);
        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(favoriRepository.save(any(Favori.class))).thenAnswer(invocation -> {
            Favori f = invocation.getArgument(0);
            f.setId(1L);
            return f;
        });
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        Favori result = favoriService.ajouterFavori(1L, request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(TypeEtablissement.RESTAURANT, result.getType());
        assertEquals(10L, result.getTargetId());
        assertEquals(testUser, result.getUtilisateur());
        verify(favoriRepository).save(any(Favori.class));
    }

    @Test
    void ajouterFavori_withExistingFavorite_shouldReturnExisting() {
        FavoriRequest request = new FavoriRequest();
        request.setType(TypeEtablissement.RESTAURANT);
        request.setTargetId(10L);

        Favori existing = new Favori();
        existing.setId(1L);
        existing.setUtilisateur(testUser);
        existing.setType(TypeEtablissement.RESTAURANT);
        existing.setTargetId(10L);

        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(true);
        when(favoriRepository.findByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(Optional.of(existing));

        Favori result = favoriService.ajouterFavori(1L, request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(favoriRepository, never()).save(any());
    }

    @Test
    void ajouterFavori_withNonExistentUser_shouldThrowResourceNotFoundException() {
        FavoriRequest request = new FavoriRequest();
        request.setType(TypeEtablissement.HOTEL);
        request.setTargetId(20L);

        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(999L, TypeEtablissement.HOTEL, 20L))
                .thenReturn(false);
        when(utilisateurRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                favoriService.ajouterFavori(999L, request)
        );
        verify(favoriRepository, never()).save(any());
    }

    // ========== Tests for supprimerFavori ==========

    @Test
    void supprimerFavori_withOwnFavorite_shouldDelete() {
        Favori favori = new Favori();
        favori.setId(1L);
        favori.setUtilisateur(testUser);
        favori.setType(TypeEtablissement.RESTAURANT);
        favori.setTargetId(10L);

        when(favoriRepository.findById(1L)).thenReturn(Optional.of(favori));

        favoriService.supprimerFavori(1L, 1L);

        verify(favoriRepository).delete(favori);
    }

    @Test
    void supprimerFavori_withOtherUserFavorite_shouldThrowResourceNotFoundException() {
        Utilisateur otherUser = new Utilisateur();
        otherUser.setId(2L);

        Favori favori = new Favori();
        favori.setId(1L);
        favori.setUtilisateur(otherUser);

        when(favoriRepository.findById(1L)).thenReturn(Optional.of(favori));

        assertThrows(ResourceNotFoundException.class, () ->
                favoriService.supprimerFavori(1L, 1L)
        );
        verify(favoriRepository, never()).delete(any(Favori.class));
    }

    @Test
    void supprimerFavori_withNonExistentFavori_shouldThrowResourceNotFoundException() {
        when(favoriRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                favoriService.supprimerFavori(1L, 999L)
        );
    }

    // ========== Tests for supprimerFavoriByTarget ==========

    @Test
    void supprimerFavoriByTarget_shouldDeleteByCompositeKey() {
        favoriService.supprimerFavoriByTarget(1L, TypeEtablissement.RESTAURANT, 10L);

        verify(favoriRepository).deleteByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L);
    }

    // ========== Tests for isFavori ==========

    @Test
    void isFavori_whenFavoriteExists_shouldReturnTrue() {
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(true);

        assertTrue(favoriService.isFavori(1L, TypeEtablissement.RESTAURANT, 10L));
    }

    @Test
    void isFavori_whenFavoriteDoesNotExist_shouldReturnFalse() {
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.HOTEL, 99L))
                .thenReturn(false);

        assertFalse(favoriService.isFavori(1L, TypeEtablissement.HOTEL, 99L));
    }

    // ========== Tests for syncFavoris ==========

    @Test
    void syncFavoris_withNewFavorites_shouldCreateAll() {
        FavoriRequest req1 = new FavoriRequest();
        req1.setType(TypeEtablissement.RESTAURANT);
        req1.setTargetId(10L);

        FavoriRequest req2 = new FavoriRequest();
        req2.setType(TypeEtablissement.HOTEL);
        req2.setTargetId(20L);

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(false);
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.HOTEL, 20L))
                .thenReturn(false);
        when(favoriRepository.save(any(Favori.class))).thenAnswer(invocation -> {
            Favori f = invocation.getArgument(0);
            f.setId(f.getTargetId()); // use targetId as mock id for simplicity
            return f;
        });

        List<Favori> results = favoriService.syncFavoris(1L, Arrays.asList(req1, req2));

        assertEquals(2, results.size());
        verify(favoriRepository, times(2)).save(any(Favori.class));
    }

    @Test
    void syncFavoris_withExistingFavorites_shouldSkipExisting() {
        FavoriRequest req1 = new FavoriRequest();
        req1.setType(TypeEtablissement.RESTAURANT);
        req1.setTargetId(10L);

        FavoriRequest req2 = new FavoriRequest();
        req2.setType(TypeEtablissement.HOTEL);
        req2.setTargetId(20L);

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.RESTAURANT, 10L))
                .thenReturn(true); // already exists
        when(favoriRepository.existsByUtilisateurIdAndTypeAndTargetId(1L, TypeEtablissement.HOTEL, 20L))
                .thenReturn(false);
        when(favoriRepository.save(any(Favori.class))).thenAnswer(invocation -> {
            Favori f = invocation.getArgument(0);
            f.setId(1L);
            return f;
        });

        List<Favori> results = favoriService.syncFavoris(1L, Arrays.asList(req1, req2));

        assertEquals(1, results.size());
        verify(favoriRepository, times(1)).save(any(Favori.class));
    }

    @Test
    void syncFavoris_withNonExistentUser_shouldThrowResourceNotFoundException() {
        when(utilisateurRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                favoriService.syncFavoris(999L, List.of())
        );
    }
}
