import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FreelancerService } from '../../services/freelancer.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, SearchbarComponent],
  providers: [FreelancerService, TokenService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  isLogged = false;
  user?: any;
  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.getUser() != null;
    if (this.isLogged) {
      this.user = this.tokenService.getUser();
    }
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateAbout(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/about', { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }

  navigateHome(event: Event) {
    var path = this.isLogged ? '/home' : '/';
    event.preventDefault();
    this.router.navigateByUrl(path, { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }

  navigatePortfolioList(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/portfolio-list', { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/login', { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToRegister(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/register', { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToFreelancers(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/freelancers', { replaceUrl: true });
    if (this.isMenuOpen == true) this.toggleMenu();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/'], { replaceUrl: true }).then(() => {
      // Reload the page after navigation
      location.reload();
    });
    if (this.isMenuOpen == true) this.toggleMenu();
  }

  visitMyProfile(event:Event) {
    event.preventDefault();
    if (this.user.userType == 'Freelancer') {
      this.router.navigate(['/freelancer', this.user._id]);
    } else {
      this.router.navigate(['/profile/client', this.user._id]);
    }

    if (this.isMenuOpen == true) this.toggleMenu();
  }
}
