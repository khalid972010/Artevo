import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-hire-freelancer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [OrderService, TokenService, HttpClient],
  templateUrl: './hire-freelancer.component.html',
  styleUrl: './hire-freelancer.component.css',
})
export class HireFreelancerComponent {
  showForm: boolean = true;
  showModal: boolean = false;
  selectedTimeline: string = '';
  freelancerID: any;

  constructor(
    private orderService: OrderService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openModal(description: string, budget: number): void {
    this.showModal = true;

    this.orderService
      .CreateOrder({
        from: this.tokenService.getUser()._id,
        to: this.data.freelancerID,
        description: description,
        price: budget,
        state: 'Pending',
        deadline: this.selectedTimeline,
        isPaid: false,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChange(newValue: string) {
    //console.log('Selected timeline:', newValue);
    this.selectedTimeline = newValue;
  }

  closeModal(): void {
    this.showModal = false;
    this.showForm = false;

    location.reload();
  }

  openForm() {
    this.showForm = true;
  }
}
