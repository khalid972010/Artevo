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
  showForm: boolean = false;
  formData: any = {};

  openForm() {
    this.showForm = true;
  }

  submitForm() {

    console.log('Form submitted:', this.formData);

    this.formData = {};
    this.showForm = false;
  }
}
