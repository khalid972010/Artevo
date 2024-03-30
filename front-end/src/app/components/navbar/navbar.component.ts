import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){}
isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateAbout(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/about");
    this.toggleMenu();
  }

  navigateHome(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/");
    this.toggleMenu();
  }

  navigatePortfolioList(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/portfolio-list");
    this.toggleMenu();
  }
}

