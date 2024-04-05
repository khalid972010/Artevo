import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-freelancer-update',
  standalone: true,
  imports: [],
  templateUrl: './profile-freelancer-update.component.html',
  styleUrl: './profile-freelancer-update.component.css'
})
export class ProfileFreelancerUpdateComponent implements OnInit{
  @Input() freelancer!: any;
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
    this.freelancer.profilePicture = this.imageUrl;
}

  ngOnInit(): void {
    const navigation = history.state;
    this.freelancer = navigation.freelancer;
    this.imageUrl = this.freelancer.profilePicture
  }
}
