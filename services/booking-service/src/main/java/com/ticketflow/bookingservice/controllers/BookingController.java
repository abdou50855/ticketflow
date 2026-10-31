package com.ticketflow.bookingservice.controllers;

import com.ticketflow.bookingservice.entities.Booking;
import com.ticketflow.bookingservice.services.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Booking> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return service.create(booking);
    }
}