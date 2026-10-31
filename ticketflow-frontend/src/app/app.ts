import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list';
import { EventListComponent } from './components/event-list/event-list';
import { CustomerFormComponent } from './components/customer-form/customer-form';
import { EventFormComponent } from './components/event-form/event-form';
import { BookingListComponent } from './components/booking-list/booking-list';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { Customer } from './services/customer';
import { Event } from './services/event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CustomerListComponent, 
    EventListComponent, 
    CustomerFormComponent, 
    EventFormComponent,
    BookingListComponent, // <-- Vérifie que c'est là
    BookingFormComponent  // <-- Vérifie que c'est là
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(CustomerListComponent) customerList!: CustomerListComponent;
  @ViewChild(EventListComponent) eventList!: EventListComponent;
  @ViewChild(BookingListComponent) bookingList!: BookingListComponent;

  customerToEdit: Customer | null = null;
  eventToEdit: Event | null = null;

  refreshCustomers() {
    this.customerToEdit = null;
    this.customerList.loadCustomers(); 
  }

  refreshEvents() {
    this.eventToEdit = null;
    this.eventList.loadEvents(); 
  }

  refreshBookings() {
    this.bookingList.loadBookings();
  }

  onEditCustomer(customer: Customer) {
    this.customerToEdit = { ...customer };
  }

  onEditEvent(event: Event) {
    this.eventToEdit = { ...event };
  }
}