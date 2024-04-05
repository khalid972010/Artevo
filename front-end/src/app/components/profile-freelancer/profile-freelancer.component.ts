import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.css',
})
export class ProfileFreelancerComponent implements OnInit {
  constructor(private router:Router){}
  @Input() selectedTab: string = 'posts';
  @Input() hisProfile!: boolean;
  @Input() freelancer!: any;
  isTooltipActive = false;

  NavigateUpdateFreelancerProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/update'], { state: {freelancer: this.freelancer } });
  }

  NavigateAddPost(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/add-post']);
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
  }
}
