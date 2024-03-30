import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutComponent } from '../about/about.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    AboutComponent,
    PortfolioComponent,
    FooterComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
