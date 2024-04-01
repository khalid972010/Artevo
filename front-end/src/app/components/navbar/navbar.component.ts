import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FreelancerService } from '../../services/freelancer.service';
import { SearchbarComponent } from '../../searchbar/searchbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,SearchbarComponent],
  providers:[FreelancerService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private http: HttpClient, private freelancerService: FreelancerService) {}


isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateAbout(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/about", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }

  navigateHome(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }

  navigatePortfolioList(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/portfolio-list", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/login", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToRegister(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/register", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }
  navigateToFreelancers(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/freelancers", {replaceUrl:true});
    if(this.isMenuOpen == true) this.toggleMenu();
  }



}

