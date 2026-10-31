import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService, Event } from '../../services/event';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventFormComponent implements OnChanges {
  @Output() eventAdded = new EventEmitter<void>();
  @Input() eventToEdit: Event | null = null;
  
  eventForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      venue: ['', Validators.required],
      date: ['', Validators.required],
      capacity: [100, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventToEdit'] && this.eventToEdit) {
      this.isEditMode = true;
      
      // On formate la date pour le champ datetime-local (YYYY-MM-DDThh:mm)
      const dateObj = new Date(this.eventToEdit.date);
      const formattedDate = dateObj.toISOString().slice(0, 16);
      
      this.eventForm.patchValue({
        ...this.eventToEdit,
        date: formattedDate
      });
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventData = {
        ...formValue,
        date: new Date(formValue.date).toISOString()
      };

      if (this.isEditMode && this.eventToEdit && this.eventToEdit.id) {
        this.eventService.updateEvent(this.eventToEdit.id, eventData).subscribe({
          next: () => {
            alert('Événement modifié avec succès !');
            this.resetForm();
            this.eventAdded.emit();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de la modification.');
          }
        });
      } else {
        this.eventService.createEvent(eventData).subscribe({
          next: () => {
            alert('Événement ajouté avec succès !');
            this.resetForm();
            this.eventAdded.emit();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de l\'ajout.');
          }
        });
      }
    }
  }

  resetForm() {
    this.isEditMode = false;
    this.eventToEdit = null;
    this.eventForm.reset();
  }
}