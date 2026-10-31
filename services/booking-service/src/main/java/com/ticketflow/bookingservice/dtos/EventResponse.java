package com.ticketflow.bookingservice.dtos;

public class EventResponse {
    private Long id;
    private String title;
    private String venue;
    private int capacity;
    private double price;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}