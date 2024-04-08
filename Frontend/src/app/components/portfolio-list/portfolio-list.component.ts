import { Component, ViewChild, ElementRef } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css'
})
export class PortfolioListComponent {
@ViewChild('cardElement') cardElement!: ElementRef;

  stripe!: Stripe|null;
  card!: StripeCardElement;

  constructor() {
    // Initialize Stripe
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await import('@stripe/stripe-js').then(module => module.loadStripe('pk_test_51OyLNFL4QN55PXT7LM20zOR87OroaoIcYA5gOtnic5ZzPUqmnjuPDJASBk9XlUeszewOp1gkoSjxwi2KQQ5XNx9T00U6mcaDy9'));
    const elements: StripeElements = this.stripe!.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  async handleSubmit() {
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.card
    });

    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Send paymentMethod.id to your server to process payment
    }
  }
}
