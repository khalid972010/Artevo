import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-client-update',
  standalone: true,
  imports: [],
  templateUrl: './profile-client-update.component.html',
  styleUrl: './profile-client-update.component.css'
})
export class ProfileClientUpdate {
  NavigateBack() {
  window.history.back();
}
}
