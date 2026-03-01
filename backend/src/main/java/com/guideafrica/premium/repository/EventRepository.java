package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    Page<Event> findByActifTrueOrderByDateDebutAsc(Pageable pageable);
    List<Event> findByActifTrueAndDateDebutAfterOrderByDateDebutAsc(LocalDateTime date);
    List<Event> findByCategorieAndActifTrue(String categorie);
}
