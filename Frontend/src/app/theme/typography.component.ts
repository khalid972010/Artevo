import { Component, OnInit, forwardRef } from '@angular/core';
import {
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  ColComponent,
  TableDirective,
  AvatarComponent,
  RowComponent,
} from '@coreui/angular';
import { LoadingComponent } from '../loading/loading.component';
import { AdminService } from '../services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { ThemeColorComponent } from './colors.component';
import { FreelancerService } from '../services/freelancer.service';
import { ClientService } from '../services/client.service';

@Component({
  templateUrl: 'typography.component.html',
  styleUrl: 'typography.component.css',

  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    TableDirective,
    AvatarComponent,
    ColComponent,
    HttpClientModule,
    forwardRef(() => ThemeColorComponent),
    LoadingComponent,
  ],
  providers: [AdminService, FreelancerService, ClientService],
})
export class TypographyComponent implements OnInit {
  ordersData: any;
  clientName = '';
  freelancerName = '';

  constructor(
    private service: AdminService,
    private freelancerService: FreelancerService,
    private clientService: ClientService
  ) {
    this.getOrders();
  }
  ngOnInit(): void {}

  getOrders() {
    this.service.getAllOrders().subscribe({
      next: (data) => {
        this.ordersData = data;
        // this.updateFreelancerNames();
        // this.updateClientNames();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // updateFreelancerNames() {
  //   for (let i = 0; i < this.ordersData.length; i++) {
  //     this.freelancerService
  //       .getFreelancerByID(this.ordersData[i].to)
  //       .subscribe({
  //         next: (data) => {
  //           this.ordersData['freelancerName'] = data['data']['fullName'];
  //           console.log(this.ordersData);
  //         },
  //       });
  //   }
  // }
  // updateClientNames() {
  //   for (let i = 0; i < this.ordersData.length; i++) {
  //     this.clientService.getByID(this.ordersData[i].from).subscribe({
  //       next: (data) => {
  //         this.ordersData['clientName'] = data['data']['fullName'];
  //       },
  //     });
  //   }
  // }
}
