package com.ticketflow.bookingservice.controllers;

import com.ticketflow.bookingservice.entities.Booking;
import com.ticketflow.bookingservice.repos.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository repo;

    public BookingController(BookingRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Booking> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        booking.setStatus("PENDING");
        return repo.save(booking);
    }
}