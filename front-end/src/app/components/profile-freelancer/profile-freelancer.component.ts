import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.css',
})
export class ProfileFreelancerComponent {
  constructor(private router:Router){}
  @Input() selectedTab: string = 'posts';

  addPost() {
    console.log('add post method');
  }
  NavigateUpdateProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer/update']);
  }
}
