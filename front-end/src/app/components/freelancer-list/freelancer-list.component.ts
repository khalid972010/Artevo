import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { FreelancerCardComponent } from '../freelancer-card/freelancer-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-freelancer-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FreelancerCardComponent],
  providers: [FreelancerService],
  templateUrl: './freelancer-list.component.html',
  styleUrl: './freelancer-list.component.css',
})
export class FreelancerListComponent {
  Freelancer: any;
  constructor(private freelancerService: FreelancerService) {}
  ngOnInit(): void {
    this.freelancerService.getAllFreelancers().subscribe(
      (data) => {
        console.log(data);
        if (data) this.Freelancer = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
