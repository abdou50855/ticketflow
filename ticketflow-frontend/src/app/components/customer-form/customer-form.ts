import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css'
})
export class CustomerFormComponent implements OnChanges {
  @Output() customerAdded = new EventEmitter<void>();
  @Input() customerToEdit: Customer | null = null;
  
  customerForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerToEdit'] && this.customerToEdit) {
      this.isEditMode = true;
      this.customerForm.patchValue(this.customerToEdit);
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      if (this.isEditMode && this.customerToEdit && this.customerToEdit.id) {
        this.customerService.updateCustomer(this.customerToEdit.id, this.customerForm.value).subscribe({
          next: () => {
            alert('Client modifié avec succès !');
            this.resetForm();
            this.customerAdded.emit();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de la modification.');
          }
        });
      } else {
        this.customerService.createCustomer(this.customerForm.value).subscribe({
          next: () => {
            alert('Client ajouté avec succès !');
            this.resetForm();
            this.customerAdded.emit();
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
    this.customerToEdit = null;
    this.customerForm.reset();
  }
}