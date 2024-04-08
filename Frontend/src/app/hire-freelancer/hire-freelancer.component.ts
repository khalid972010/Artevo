import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hire-freelancer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hire-freelancer.component.html',
  styleUrl: './hire-freelancer.component.css'
})
export class HireFreelancerComponent {
  showForm: boolean = true;
  showModal: boolean = false;

  constructor() { }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showForm = false;  
  }

  openForm() {
    this.showForm = true;
  }


}
