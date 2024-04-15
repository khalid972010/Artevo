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
    private userToken:TokenService,
    private clientService:ClientService
  ) { }
  Order:any;
  client:any;
  ngOnInit(): void {
    const orderID = this.route.snapshot.queryParams['order'];
    //success

    this.orderService.findByPaymentID(orderID).subscribe(
      (res)=>{
        this.Order=res;
        // if(!this.route.snapshot.queryParams['success'])
        //   {
        //     var url = "profile/client/" + this.Order.from
        //     location.assign(url);
        //     return ;
        //   }
        this.orderService.updateOrderPaymentStatus(this.Order._id).subscribe(
          (res)=>{
                this.clientService.reviewActivation(this.Order.to,this.Order.from).subscribe(
                  (res)=>{
                    console.log(res);
                    this.client = this.userToken.getUser();
                    this.client.previousFreelancers.push(this.Order.to);
                    console.log(this.client);
                    localStorage.setItem('user', JSON.stringify(this.client))
                    var url = "profile/client/" + this.Order.from
                     location.assign(url);
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



