import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
//import { privateDecrypt } from 'crypto';
//import { error } from 'console';

@Component({
  selector: 'app-profile-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers:[ClientService,OrderService],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css',
})
export class ProfileClientComponent  implements OnInit {
  constructor(private router: Router,
              private route:ActivatedRoute,
              private clientservice:ClientService,
              private orderService:OrderService
  ) {}
  @Input() selectedTab: string = 'orders';
  ClientID:any;
  Client:any;
  ClientOrders:any;


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.ClientID = params['id'];
      });
      this.clientservice.getByID(this.ClientID).subscribe(
        (res) => {
          this.Client = res.data;
         // console.log(this.Client);
        },
        (error) => {
          console.error(error);
        }
      );


      this.orderService.getClientOrders(this.ClientID).subscribe(
        (res)=>{
          console.log(res);
          this.ClientOrders=res;
        },
        (error)=>{
          console.log(error);
        }
      )

    }
    addPost() {
      console.log('add post method');
    }
    NavigateUpdateProfile(event: Event) {
      event.preventDefault();
      this.router.navigate(['/profile/client/update/',this.ClientID]);}













      openResponse:boolean=false;
      selectedOrderResponse:string='';

      viewResponse(OrderResponse: string) {
        this.selectedOrderResponse=OrderResponse;
        this.openResponse = true;
      }
      closeResponse(){
        this.selectedOrderResponse='';
        this.openResponse = false;

      }



}
