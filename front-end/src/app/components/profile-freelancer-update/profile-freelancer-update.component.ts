import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-freelancer-update',
  standalone: true,
  imports: [],
  templateUrl: './profile-freelancer-update.component.html',
  styleUrl: './profile-freelancer-update.component.css'
})
export class ProfileFreelancerUpdateComponent {
  NavigateBack() {
  window.history.back();
}
}
