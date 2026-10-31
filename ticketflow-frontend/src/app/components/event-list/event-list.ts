import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../../services/event';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  @Output() editClicked = new EventEmitter<Event>();

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur lors de la récupération des événements :', err)
    });
  }

  editEvent(event: Event) {
    this.editClicked.emit(event);
    this.cdr.detectChanges(); // <-- LA LIGNE MAGIQUE
  }

  deleteEvent(id: number | undefined) {
    if (id && confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => this.loadEvents(),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
}