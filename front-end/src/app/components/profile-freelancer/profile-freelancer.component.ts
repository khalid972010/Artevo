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

  NavigateUpdateProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/update']);
  }
  NavigateAddPost(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/add-post']);
  }

  toggleTooltipColor(event: Event) {
   //TODO: Handle Follow Logic
    const element = event.target as HTMLElement;
    var tooltipElement = document.querySelector('.tooltip-container');
    tooltipElement!.classList.toggle('pressed');
  }

  ngOnInit(): void {
    const navigation = history.state;
    this.hisProfile = navigation.hisProfile;
    this.freelancer = navigation.freelancer;
  }
}
