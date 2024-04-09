import { loadScript } from '@paypal/paypal-js';
import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
declare var paypal: any;
@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css',
})
export class PortfolioListComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  product = {
    price: 100,
    description: 'Nice product',
  };
  paidFor = false;
  cardholderName = '';
  expireDate = '';
  cardNumber = '';
  CVV!: number;
  flipState: string = 'notFlipped';
  constructor() {}
  ngOnInit(): void {
    paypal
      .Buttons({
        style: {
          layout: 'vertical', // Display buttons horizontally
          color: 'black', // PayPal button color
          shape: 'pill', // Button shape
          label: 'checkout', // Button label
          tagline: false, // Hide PayPal tagline
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture().then((details: any) => {
            console.log(details);
          });
          this.paidFor = true;
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(document.getElementById('paypal'));
  }

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
}
