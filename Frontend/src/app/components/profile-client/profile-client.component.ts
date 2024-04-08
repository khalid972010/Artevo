import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css',
})
export class ProfileClientComponent {
  constructor(private router: Router) {}
  @Input() selectedTab: string = 'orders';

  addPost() {
    console.log('add post method');
  }
  NavigateUpdateProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/client/update']);
  }
}
