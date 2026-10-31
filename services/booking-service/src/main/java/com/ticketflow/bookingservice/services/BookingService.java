package com.ticketflow.bookingservice.services;

import com.ticketflow.bookingservice.clients.EventClient;
import com.ticketflow.bookingservice.dtos.EventResponse;
import com.ticketflow.bookingservice.entities.Booking;
import com.ticketflow.bookingservice.repos.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repo;
    private final EventClient eventClient;

    public BookingService(BookingRepository repo, EventClient eventClient) {
        this.repo = repo;
        this.eventClient = eventClient;
    }

    public List<Booking> getAll() {
        return repo.findAll();
    }

    public Booking create(Booking booking) {
        // 1. On appelle event-service via OpenFeign
        EventResponse event = eventClient.getById(booking.getEventId());

        // 2. (Optionnel) On peut vérifier la capacité
        // if (event.getCapacity() < booking.getQuantity()) {
        //     throw new RuntimeException("Pas assez de places disponibles");
        // }

        // 3. Si l'appel réussit, on enregistre la réservation
        booking.setStatus("PENDING");
        return repo.save(booking);
    }
}