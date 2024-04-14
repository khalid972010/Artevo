import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { TokenService } from '../../services/token.service';

import { HireFreelancerComponent } from '../../hire-freelancer/hire-freelancer.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { ReviewsComponent } from '../reviews/reviews.component';
import { LoadingComponent } from "../../loading/loading.component";
//import { error } from 'console';
//import { error } from 'console';

@Component({
    selector: 'app-profile-freelancer',
    standalone: true,
    providers: [
        FreelancerService,
        PortfolioService,
        TokenService,
        OrderService,
        ClientService,
    ],
    templateUrl: './profile-freelancer.component.html',
    styleUrl: './profile-freelancer.component.css',
    imports: [FormsModule, CommonModule, PortfolioComponent, ReviewsComponent, LoadingComponent]
})
export class ProfileFreelancerComponent implements OnInit {
  freelancerId: string = '';
  freelancerPortfolio: any;
  freelancer: any;
  orders: any;
  isVisitorClient!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private portfolioService: PortfolioService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private clientService: ClientService,
    
  ) {}
  @Input() selectedTab: string = 'posts';
  @Input() hisProfile!: boolean;
  isTooltipActive!: boolean;

  addPost() {
    //console.log('add post method');
  }
  NavigateUpdateProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/update', this.freelancerId]);
  }
  NavigateAddPost(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/add-post', this.freelancerId]);
  }

  toggleTooltipColor() {
    this.isTooltipActive = !this.isTooltipActive;
  }

  followFreelancer() {
    var token = this.tokenService.getToken();
    console.log(this.isTooltipActive);
  if (!this.isTooltipActive) {
    this.clientService.followFreelancer(token!, this.freelancerId).subscribe({
      next: () => {
        this.toggleTooltipColor();
        let user = this.tokenService.getUser();
        user.following.push(this.freelancerId);
        this.tokenService.setUser(user);
        this.freelancer.followers.length += 1;
      },
      error: (error) => {
        alert(error.toString());
      },
    });
  } else {
    this.clientService.unfollowFreelancer(token!, this.freelancerId).subscribe({
      next: () => {
        this.toggleTooltipColor();
        let user = this.tokenService.getUser();
        let index = user.following.indexOf(this.freelancerId);

        if (index !== -1) {
          user.following.splice(index, 1);
        }
        this.tokenService.setUser(user);
        this.freelancer.followers.length -= 1;
      },
      error: (error) => {
        alert(error.toString());
      },
    });
  }
}


  async getClientName(clientID: string): Promise<string> {
    try {
      const res = await this.clientService.getByID(clientID).toPromise();
      return res.data.fullName;
    } catch (error) {
      console.error(error);
      return '';
    }
  }
  ngOnInit(): void {
    const navigation = history.state;
    this.freelancer = navigation.freelancer;

    this.route.params.subscribe((params) => {
      this.freelancerId = params['id'];
      this.hisProfile = this.tokenService.getUser()._id === this.freelancerId;
      this.isVisitorClient = this.tokenService.getUser().userType == 'Client';
      if (this.isVisitorClient) {
        this.isTooltipActive = this.tokenService.getUser().following.includes(this.freelancerId)
      }
      this.freelancerService.getFreelancerByID(this.freelancerId).subscribe(
        (res) => {
          this.freelancer = res.data;
          //console.log(this.freelancer);
        },
        (error) => {
          //console.error(error);
        }
      );

      this.portfolioService.getOwnerPortfolio(this.freelancerId).subscribe(
        (res) => {
          this.freelancerPortfolio = res;
          // console.log(res);
          // console.log(this.freelancerPortfolio);
        },
        (error) => {
          //console.log(error);
        }
      );
    });

    this.orderService.FreelancerOrders(this.freelancerId).subscribe(
      (res) => {
        this.orders = res;
        this.orders.data.FreelancerOrders.forEach(
          async (order: { clientName: string; from: string }) => {
            order.clientName = await this.getClientName(order.from);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openHireFreelancer() {
    const dialogRef = this.dialog.open(HireFreelancerComponent, {
      width: '400px',
      data: { freelancerID: this.freelancerId }, // Pass your data here
    });
  }

  AcceptOrder(ordersItemID: string) {
    // Call your service method to update the order status
    this.orderService.updateOrderStatus(ordersItemID, 'InProgress').subscribe(
      (res) => {
        // console.log(res);

        // Handle success response if needed
        console.log('Order status updated successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error updating order status:', error);
      }
    );
  }
  openResponseForm: boolean = false;
  selectedOrderId: string | null = null;
  responseText: string = '';

  openFreelancerResponse(orderId: string) {
    this.selectedOrderId = orderId;
    this.openResponseForm = true;
  }

  closeFreelancerResponse() {
    this.selectedOrderId = null;
    this.responseText = '';
    this.openResponseForm = false;
  }

  submitResponse() {
    if (this.selectedOrderId && this.responseText) {
      console.log('Selected Order ID:', this.selectedOrderId);
      console.log('Response Text:', this.responseText);

      this.orderService
        .updateFreelancerResponse(this.selectedOrderId, this.responseText)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );

      this.selectedOrderId = null;
      this.responseText = '';
      this.openResponseForm = false;
    }
  }
}
