import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { error } from 'console';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
import { LoadingComponent } from '../../loading/loading.component';


@Component({
  selector: 'app-payment-validate',
  standalone: true,
  imports: [LoadingComponent],
  providers:[OrderService,TokenService,ClientService],
  templateUrl: './payment-validate.component.html',
  styleUrl: './payment-validate.component.scss'
})
export class PaymentValidateComponent  implements OnInit{
  constructor(private route: ActivatedRoute,
    private orderService:OrderService,
    private tokenService:TokenService,
    private clientService:ClientService
  ) { }
  Order:any;
  ngOnInit(): void {
    const orderID = this.route.snapshot.queryParams['order'];
    this.orderService.findByPaymentID(orderID).subscribe(
      (res)=>{

        this.Order=res;
        this.orderService.updateOrderPaymentStatus(this.Order._id).subscribe(
          (res)=>{
           // console.log(res);
            // console.log(this.tokenService.getUser()._id);
            this.clientService.getByID(this.Order.from).subscribe(
              (res)=>{
                console.log(res);
                var url = "profile/client/" + Object(res).data._id;
                location.assign(url);

                // this.clientService.completeOrder(res.data,this.Order.to).subscribe(
                //   (res)=>{
                //     console.log(res);
                //   },
                //   (error)=>{
                //     console.log(error);
                //   }
                // )
              },
              (error)=>{
                console.log(error);
              }
            )

          },
          (error)=>{
            console.log(error);
          }
        )
      },
      (error)=>{
        console.log(error);
      }
    )


    }
  }



