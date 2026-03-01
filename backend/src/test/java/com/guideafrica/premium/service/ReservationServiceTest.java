package com.guideafrica.premium.service;

import com.guideafrica.premium.dto.ReservationRequest;
import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Hotel;
import com.guideafrica.premium.model.Reservation;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.model.enums.RoleUtilisateur;
import com.guideafrica.premium.model.enums.StatutReservation;
import com.guideafrica.premium.model.enums.TypeReservation;
import com.guideafrica.premium.repository.HotelRepository;
import com.guideafrica.premium.repository.ReservationRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private ReservationService reservationService;

    private Utilisateur testUser;
    private Restaurant testRestaurant;
    private Hotel testHotel;

    @BeforeEach
    void setUp() {
        testUser = new Utilisateur();
        testUser.setId(1L);
        testUser.setPrenom("Aminata");
        testUser.setNom("Diallo");
        testUser.setEmail("aminata@example.com");
        testUser.setRole(RoleUtilisateur.USER);
    }

    // ========== Tests for creerReservation (restaurant) ==========

    @Test
    void creerReservation_forRestaurant_shouldCreateAndReturnReservation() {
        ReservationRequest request = new ReservationRequest();
        request.setTypeReservation(TypeReservation.RESTAURANT);
        request.setTargetId(10L);
        request.setDateReservation(LocalDate.of(2026, 3, 15));
        request.setHeureReservation(LocalTime.of(19, 30));
        request.setNombrePersonnes(4);
        request.setEmail("aminata@example.com");
        request.setTelephone("+221770001122");

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> {
            Reservation r = invocation.getArgument(0);
            r.setId(100L);
            return r;
        });
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        Reservation result = reservationService.creerReservation(1L, request);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals(TypeReservation.RESTAURANT, result.getTypeReservation());
        assertEquals(10L, result.getTargetId());
        assertEquals(4, result.getNombrePersonnes());
        assertEquals(testUser, result.getUtilisateur());
        verify(reservationRepository).save(any(Reservation.class));
        verify(emailService).envoyerConfirmationReservation(eq("aminata@example.com"), anyString(), anyString());
        verify(notificationService).creer(eq(1L), anyString(), anyString(), any(), anyString());
    }

    @Test
    void creerReservation_forHotel_shouldCreateAndReturnReservation() {
        ReservationRequest request = new ReservationRequest();
        request.setTypeReservation(TypeReservation.HOTEL);
        request.setTargetId(20L);
        request.setDateCheckIn(LocalDate.of(2026, 4, 1));
        request.setDateCheckOut(LocalDate.of(2026, 4, 5));
        request.setNombrePersonnes(2);
        request.setNombreChambres(1);
        request.setNotesSpeciales("Vue sur mer souhaitee");
        request.setEmail("aminata@example.com");

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> {
            Reservation r = invocation.getArgument(0);
            r.setId(101L);
            return r;
        });
        when(hotelRepository.findById(20L)).thenReturn(Optional.empty());

        Reservation result = reservationService.creerReservation(1L, request);

        assertNotNull(result);
        assertEquals(101L, result.getId());
        assertEquals(TypeReservation.HOTEL, result.getTypeReservation());
        assertEquals(20L, result.getTargetId());
        assertEquals(2, result.getNombrePersonnes());
        assertEquals(1, result.getNombreChambres());
        assertEquals("Vue sur mer souhaitee", result.getNotesSpeciales());
        verify(reservationRepository).save(any(Reservation.class));
        verify(emailService).envoyerConfirmationReservation(eq("aminata@example.com"), anyString(), anyString());
    }

    @Test
    void creerReservation_withNonExistentUser_shouldThrowResourceNotFoundException() {
        ReservationRequest request = new ReservationRequest();
        request.setTypeReservation(TypeReservation.RESTAURANT);
        request.setTargetId(10L);
        request.setNombrePersonnes(2);

        when(utilisateurRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.creerReservation(999L, request)
        );
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void creerReservation_withNoRequestEmail_shouldUseUserEmail() {
        ReservationRequest request = new ReservationRequest();
        request.setTypeReservation(TypeReservation.RESTAURANT);
        request.setTargetId(10L);
        request.setDateReservation(LocalDate.of(2026, 3, 15));
        request.setNombrePersonnes(2);
        // email is null in request

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> {
            Reservation r = invocation.getArgument(0);
            r.setId(102L);
            return r;
        });
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        reservationService.creerReservation(1L, request);

        verify(emailService).envoyerConfirmationReservation(eq("aminata@example.com"), anyString(), anyString());
    }

    // ========== Tests for annulerReservation (cancel) ==========

    @Test
    void annulerReservation_withPendingReservation_shouldCancel() {
        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(testUser);
        reservation.setStatut(StatutReservation.EN_ATTENTE);
        reservation.setTypeReservation(TypeReservation.RESTAURANT);
        reservation.setTargetId(10L);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        Reservation result = reservationService.annulerReservation(1L, 100L);

        assertNotNull(result);
        assertEquals(StatutReservation.ANNULEE, result.getStatut());
        verify(reservationRepository).save(reservation);
    }

    @Test
    void annulerReservation_withConfirmedReservation_shouldThrowIllegalStateException() {
        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(testUser);
        reservation.setStatut(StatutReservation.CONFIRMEE);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () ->
                reservationService.annulerReservation(1L, 100L)
        );
        assertEquals("Seules les réservations en attente peuvent être annulées", exception.getMessage());
        verify(reservationRepository, never()).save(any());
    }

    @Test
    void annulerReservation_withTerminatedReservation_shouldThrowIllegalStateException() {
        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(testUser);
        reservation.setStatut(StatutReservation.TERMINEE);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));

        assertThrows(IllegalStateException.class, () ->
                reservationService.annulerReservation(1L, 100L)
        );
    }

    @Test
    void annulerReservation_withNonExistentReservation_shouldThrowResourceNotFoundException() {
        when(reservationRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.annulerReservation(1L, 999L)
        );
    }

    @Test
    void annulerReservation_withDifferentUser_shouldThrowResourceNotFoundException() {
        Utilisateur otherUser = new Utilisateur();
        otherUser.setId(2L);

        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(otherUser);
        reservation.setStatut(StatutReservation.EN_ATTENTE);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.annulerReservation(1L, 100L)
        );
    }

    // ========== Tests for getReservations ==========

    @Test
    void getReservations_shouldReturnUserReservations() {
        Reservation r1 = new Reservation();
        r1.setId(1L);
        r1.setTypeReservation(TypeReservation.RESTAURANT);
        r1.setTargetId(10L);

        Reservation r2 = new Reservation();
        r2.setId(2L);
        r2.setTypeReservation(TypeReservation.HOTEL);
        r2.setTargetId(20L);

        when(reservationRepository.findByUtilisateurIdOrderByCreatedAtDesc(1L))
                .thenReturn(Arrays.asList(r1, r2));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());
        when(hotelRepository.findById(20L)).thenReturn(Optional.empty());

        List<Reservation> results = reservationService.getReservations(1L);

        assertNotNull(results);
        assertEquals(2, results.size());
        verify(reservationRepository).findByUtilisateurIdOrderByCreatedAtDesc(1L);
    }

    @Test
    void getReservations_withNoReservations_shouldReturnEmptyList() {
        when(reservationRepository.findByUtilisateurIdOrderByCreatedAtDesc(1L))
                .thenReturn(List.of());

        List<Reservation> results = reservationService.getReservations(1L);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    // ========== Tests for getReservationById ==========

    @Test
    void getReservationById_withValidUserAndId_shouldReturnReservation() {
        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(testUser);
        reservation.setTypeReservation(TypeReservation.RESTAURANT);
        reservation.setTargetId(10L);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        Reservation result = reservationService.getReservationById(1L, 100L);

        assertNotNull(result);
        assertEquals(100L, result.getId());
    }

    @Test
    void getReservationById_withDifferentUser_shouldThrowResourceNotFoundException() {
        Utilisateur otherUser = new Utilisateur();
        otherUser.setId(2L);

        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(otherUser);

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.getReservationById(1L, 100L)
        );
    }

    @Test
    void getReservationById_withNonExistentId_shouldThrowResourceNotFoundException() {
        when(reservationRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.getReservationById(1L, 999L)
        );
    }

    // ========== Tests for updateStatut ==========

    @Test
    void updateStatut_shouldUpdateAndNotifyUser() {
        Reservation reservation = new Reservation();
        reservation.setId(100L);
        reservation.setUtilisateur(testUser);
        reservation.setTypeReservation(TypeReservation.RESTAURANT);
        reservation.setTargetId(10L);
        reservation.setEmail("aminata@example.com");

        when(reservationRepository.findById(100L)).thenReturn(Optional.of(reservation));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(restaurantRepository.findById(10L)).thenReturn(Optional.empty());

        Reservation result = reservationService.updateStatut(100L, StatutReservation.CONFIRMEE);

        assertNotNull(result);
        assertEquals(StatutReservation.CONFIRMEE, result.getStatut());
        verify(emailService).envoyerChangementStatutReservation(eq("aminata@example.com"), anyString(), eq("CONFIRMEE"));
        verify(notificationService).creer(eq(1L), anyString(), anyString(), any(), anyString());
    }

    @Test
    void updateStatut_withNonExistentReservation_shouldThrowResourceNotFoundException() {
        when(reservationRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                reservationService.updateStatut(999L, StatutReservation.CONFIRMEE)
        );
    }
}
