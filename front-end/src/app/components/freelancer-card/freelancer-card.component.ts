import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-freelancer-card',
  standalone: true,
  imports: [],
  templateUrl: './freelancer-card.component.html',
  styleUrl: './freelancer-card.component.css'
})
export class FreelancerCardComponent {
  @Input() freelancer: any;
}
