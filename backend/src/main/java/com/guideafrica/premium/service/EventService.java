package com.guideafrica.premium.service;

import com.guideafrica.premium.model.Event;
import com.guideafrica.premium.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Page<Event> findAll(Pageable pageable) {
        return eventRepository.findByActifTrueOrderByDateDebutAsc(pageable);
    }

    public List<Event> findUpcoming() {
        return eventRepository.findByActifTrueAndDateDebutAfterOrderByDateDebutAsc(LocalDateTime.now());
    }

    public List<Event> findByCategorie(String categorie) {
        return eventRepository.findByCategorieAndActifTrue(categorie);
    }

    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evenement non trouve"));
    }

    @Transactional
    public Event create(Event event) {
        return eventRepository.save(event);
    }

    @Transactional
    public Event update(Long id, Event eventDetails) {
        Event event = findById(id);
        event.setTitre(eventDetails.getTitre());
        event.setDescription(eventDetails.getDescription());
        event.setImageCouverture(eventDetails.getImageCouverture());
        event.setLieu(eventDetails.getLieu());
        event.setAdresse(eventDetails.getAdresse());
        event.setDateDebut(eventDetails.getDateDebut());
        event.setDateFin(eventDetails.getDateFin());
        event.setPrix(eventDetails.getPrix());
        event.setPlacesTotal(eventDetails.getPlacesTotal());
        event.setCategorie(eventDetails.getCategorie());
        return eventRepository.save(event);
    }

    @Transactional
    public void delete(Long id) {
        Event event = findById(id);
        event.setActif(false);
        eventRepository.save(event);
    }
}
