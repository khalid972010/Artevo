import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [FormsModule, CommonModule,PortfolioComponent],
  providers:[FreelancerService,PortfolioService],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.css',
})
export class ProfileFreelancerComponent implements OnInit  {
  freelancerId: string = "";
  freelancerPortfolio:any;
  freelancer:any;
  constructor(private router:Router,
              private route: ActivatedRoute,
               private freelancerService:FreelancerService,
               private portfolioService:PortfolioService){}
  @Input() selectedTab: string = 'posts';
  @Input() hisProfile!: boolean;
  isTooltipActive = false;

  addPost() {
    console.log('add post method');
  }
  NavigateUpdateProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/update',this.freelancerId]);
  }
  NavigateAddPost(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/add-post',this.freelancerId]);

  }
  toggleTooltipColor() {
    //TODO: Handle Follow Logic

    this.isTooltipActive = !this.isTooltipActive;
    var tooltipElement = document.querySelector('.tooltip-container');
    var textElement = document.querySelector('.text');
    var followersElement = document.querySelector('.tooltip');
    var svgIconElement = document.querySelector('.svgIcon');
    tooltipElement!.classList.toggle('pressed');
    textElement!.classList.toggle('pressedText');
    followersElement!.classList.toggle('pressed');
    svgIconElement!.classList.toggle('pressed');
  }
  ngOnInit(): void {
    const navigation = history.state;
    this.hisProfile = navigation.hisProfile;
    this.freelancer = navigation.freelancer;

    this.route.params.subscribe(params => {
      this.freelancerId = params['id'];
      console.log(this.freelancerId);

      this.freelancerService.getFreelancerByID(this.freelancerId).subscribe(
        (res) => {
          this.freelancer = res.data;
          console.log(this.freelancer);
        },
        (error) => {
          console.error(error);
        }
      );

      this.portfolioService.getOwnerPortfolio(this.freelancerId).subscribe(
        (res) => {
          this.freelancerPortfolio = res;
          console.log(res);
          console.log(this.freelancerPortfolio);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

}
