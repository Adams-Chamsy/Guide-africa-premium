package com.guideafrica.premium.dto;

import com.guideafrica.premium.model.enums.TypeReservation;

import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationRequest {

    @NotNull(message = "Le type de réservation est obligatoire")
    private TypeReservation typeReservation;

    @NotNull(message = "L'identifiant cible est obligatoire")
    private Long targetId;

    @Future(message = "La date de reservation doit etre dans le futur")
    private LocalDate dateReservation;

    private LocalTime heureReservation;

    @Future(message = "La date de check-in doit etre dans le futur")
    private LocalDate dateCheckIn;

    private LocalDate dateCheckOut;

    @NotNull(message = "Le nombre de personnes est obligatoire")
    @Min(value = 1, message = "Le nombre de personnes doit être au moins 1")
    private Integer nombrePersonnes;

    private Integer nombreChambres;

    private String notesSpeciales;

    private String telephone;

    @Email(message = "L'adresse email n'est pas valide")
    private String email;

    // Getters & Setters

    public TypeReservation getTypeReservation() { return typeReservation; }
    public void setTypeReservation(TypeReservation typeReservation) { this.typeReservation = typeReservation; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public LocalDate getDateReservation() { return dateReservation; }
    public void setDateReservation(LocalDate dateReservation) { this.dateReservation = dateReservation; }

    public LocalTime getHeureReservation() { return heureReservation; }
    public void setHeureReservation(LocalTime heureReservation) { this.heureReservation = heureReservation; }

    public LocalDate getDateCheckIn() { return dateCheckIn; }
    public void setDateCheckIn(LocalDate dateCheckIn) { this.dateCheckIn = dateCheckIn; }

    public LocalDate getDateCheckOut() { return dateCheckOut; }
    public void setDateCheckOut(LocalDate dateCheckOut) { this.dateCheckOut = dateCheckOut; }

    public Integer getNombrePersonnes() { return nombrePersonnes; }
    public void setNombrePersonnes(Integer nombrePersonnes) { this.nombrePersonnes = nombrePersonnes; }

    public Integer getNombreChambres() { return nombreChambres; }
    public void setNombreChambres(Integer nombreChambres) { this.nombreChambres = nombreChambres; }

    public String getNotesSpeciales() { return notesSpeciales; }
    public void setNotesSpeciales(String notesSpeciales) { this.notesSpeciales = notesSpeciales; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
