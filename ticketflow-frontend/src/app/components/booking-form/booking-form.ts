import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingFormComponent {
  @Output() bookingAdded = new EventEmitter<void>();
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.bookingForm = this.fb.group({
      customerId: ['', Validators.required],
      eventId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.createBooking(this.bookingForm.value).subscribe({
        next: () => {
          alert('Réservation créée avec succès !');
          this.bookingForm.reset({ quantity: 1 });
          this.bookingAdded.emit();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur : L\'événement ou le client n\'existe pas.');
        }
      });
    }
  }
}