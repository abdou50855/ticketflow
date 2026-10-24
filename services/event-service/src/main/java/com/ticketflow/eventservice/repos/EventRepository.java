package com.ticketflow.eventservice.repos;

import com.ticketflow.eventservice.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}