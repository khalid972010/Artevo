import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-client-update',
  standalone: true,
  imports: [],
  templateUrl: './profile-client-update.component.html',
  styleUrl: './profile-client-update.component.css'
})
export class ProfileClientUpdate {
  imageUrl?: string;

  NavigateBack() {
  window.history.back();
  }

  handleFileInput(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };

  reader.readAsDataURL(file);
}
}
