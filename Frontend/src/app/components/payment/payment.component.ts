import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  providers: [PaymentService, OrderService,TokenService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tokenService:TokenService
  ) {}
  //this.tokenService.getUser()._id
  //'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjd09UWTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuV0FyRnlveGQ3RzdmVXhXeUFZNE8tMHB4UDNudlc2bGdkZEMxZ1FhWGFWbnhsZldINzNldEJPTG84WU9fSFExdlJVaklhTmNnUGk5clJzTUFYcG5BZVE='
  OrderID: any;
  order: any;
  TokenRes: any;
  TokenRes2:any;
  resID:any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.OrderID = params['id'];
      console.log(this.OrderID);

      // Fetch the order details inside the params subscription
      this.orderService.getOrderByID(this.OrderID).subscribe(
        (res) => {
          this.order = res;
          console.log(this.order);

          // Once order is fetched, proceed with payment processing
          this.processPayment();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  processPayment() {
    if (!this.order) {
      console.log('Order not fetched yet');
      return;
    }

    this.paymentService.getToken("ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjd09UWTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuV0FyRnlveGQ3RzdmVXhXeUFZNE8tMHB4UDNudlc2bGdkZEMxZ1FhWGFWbnhsZldINzNldEJPTG84WU9fSFExdlJVaklhTmNnUGk5clJzTUFYcG5BZVE=").subscribe(
      (tokenRes: any) => {
        const authToken = tokenRes.token;
        this.paymentService.OrderRegistrationAPI({
          "auth_token": authToken,
          "delivery_needed": "false",
          "amount_cents": Number(this.order.price * 100),
          "currency": "EGP",
          "items": []
        }).subscribe(
          (orderRes: any) => {
            console.log('Order registration response:', orderRes);
            const orderId = orderRes.id;

            this.paymentService.PaymentKeyRequest({
              "auth_token": authToken,
              "amount_cents": Number(this.order.price * 100),
              "expiration": 3600,
              "order_id": orderId,
              "billing_data": {
                "apartment": "803",
                "email": "claudette09@exa.com",
                "floor": "42",
                "first_name": "Clifford",
                "street": "Ethan Land",
                "building": "8028",
                "phone_number": "+86(8)9135210487",
                "shipping_method": "PKG",
                "postal_code": "01898",
                "city": "Jaskolskiburgh",
                "country": "CR",
                "last_name": "Nicolas",
                "state": "Utah"
              },
              "currency": "EGP",
              "integration_id": 4556058

            }).subscribe(
              (paymentKeyRes: any) => {
                this.TokenRes2=paymentKeyRes.token;
                console.log('Payment key response:', this.TokenRes2);
                //this.order.isPaid=true;

                // this.orderService.updateOrderPaymentStatus(this.OrderID).subscribe(
                //   (res)=>{console.log(res)},
                //   (error)=>{console.log(error);}
                //   )
                console.log(this.OrderID);
                console.log(orderId);
                this.orderService.updateOrderPaymentID(this.OrderID,orderId).subscribe(
                  (res)=>{
                    console.log(res);
                  },
                  (error)=>{
                    console.log(error);
                  }
                )
                //console.log(this.order);
              location.assign("https://accept.paymob.com/api/acceptance/iframes/837996?payment_token="+ this.TokenRes2);

              },
              (paymentKeyError: any) => {
                console.log('Error requesting payment key:', paymentKeyError);
              }
            );
          },
          (orderError: any) => {
            console.log('Error registering order:', orderError);
          }

        );


      },
      (tokenError: any) => {
        console.log('Error getting token:', tokenError);
      }
    );
  }

}
