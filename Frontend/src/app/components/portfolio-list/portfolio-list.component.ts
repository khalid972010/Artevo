import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
})
export class PortfolioListComponent {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe!: Stripe | null;
  card!: StripeCardElement;

  cardholderName = '';
  expireDate = '';
  cardNumber = '';
  CVV!: number;
  flipState: string = 'notFlipped';
  //#region UI of the VISA
  formatCardNumber(): void {
    this.cardNumber = this.cardNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }
  isFlipped: boolean = false;

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  flipToFront(): void {
    this.isFlipped = false;
  }

  flipToBack(): void {
    this.isFlipped = true;
  }
  //#endregion

  constructor() {
    // Initialize Stripe
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await import('@stripe/stripe-js').then((module) =>
      module.loadStripe(
        'pk_test_51OyLNFL4QN55PXT7LM20zOR87OroaoIcYA5gOtnic5ZzPUqmnjuPDJASBk9XlUeszewOp1gkoSjxwi2KQQ5XNx9T00U6mcaDy9'
      )
    );
    const elements: StripeElements = this.stripe!.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  async handleSubmit() {
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Send paymentMethod.id to your server to process payment
    }
  }
}
