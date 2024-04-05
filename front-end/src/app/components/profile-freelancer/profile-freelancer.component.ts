import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.css',
})
export class ProfileFreelancerComponent {
  //for posts and orders-------->
  @Input() selectedTab: string = 'posts';

  addPost() {
    console.log('add post method');
  }
  updateProfile() {
    console.log('update profile method');
  }
}
