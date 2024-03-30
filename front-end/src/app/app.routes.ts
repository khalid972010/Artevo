import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';

export const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "about", component: AboutUsComponent },
  { path: "portfolio-list", component: PortfolioListComponent },
];
