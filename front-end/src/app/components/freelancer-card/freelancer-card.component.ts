import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-freelancer-card',
  standalone: true,
  imports: [],
  templateUrl: './freelancer-card.component.html',
  styleUrl: './freelancer-card.component.css'
})
export class FreelancerCardComponent {
  constructor(private router:Router){}
  @Input() freelancer: any;

  NavigateFreelancerProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile/freelancer'], { state: { hisProfile: true, freelancer: this.freelancer } });
  }
}
