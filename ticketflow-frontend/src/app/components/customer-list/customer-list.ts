import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Customer } from '../../services/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  @Output() editClicked = new EventEmitter<Customer>();

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur lors de la récupération :', err)
    });
  }

  editCustomer(customer: Customer) {
    this.editClicked.emit(customer);
    this.cdr.detectChanges(); // <-- LA LIGNE MAGIQUE
  }

  deleteCustomer(id: number | undefined) {
    if (id && confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
}