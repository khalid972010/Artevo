import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-freelancer-card',
  standalone: true,
  imports: [],
  providers: [TokenService],
  templateUrl: './freelancer-card.component.html',
  styleUrl: './freelancer-card.component.css',
})
export class FreelancerCardComponent {
  constructor(private router: Router, private tokenService: TokenService) {}
  @Input() freelancer: any;

  NavigateFreelancerProfile(event: Event) {
    event.preventDefault();

    if (this.tokenService.getUser()) {
      const url = '/freelancer/' + this.freelancer._id;
      this.router.navigate([url], {
        state: { hisProfile: true, freelancer: this.freelancer },
      });
    } else {
      this.router.navigate(['/login'], {
        state: { hisProfile: true, freelancer: this.freelancer },
      });
    }
  }
}
