import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopicsComponent } from './Component/topics/topics.component';
import { PortfolioComponent } from './Component/portfolio/portfolio.component';
import { HomeComponent } from './Component/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortfolioComponent, HomeComponent, TopicsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FrontEnd';
}
