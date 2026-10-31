import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../services/booking';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css'
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur lors de la récupération :', err)
    });
  }
}