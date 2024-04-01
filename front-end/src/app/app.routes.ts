import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EnterMailComponent } from './components/auth/enter-mail/enter-mail.component';
import { FreelancerListComponent } from './components/freelancer-list/freelancer-list.component';
import { FreelancerCardComponent } from './components/freelancer-card/freelancer-card.component';

export const routes: Routes = [
  { path: "", component: MainComponent},
  { path: "about", component: AboutUsComponent },
  { path: "portfolio-list", component: PortfolioListComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {path: "login/reset/mail", component: EnterMailComponent},
  {path: "freelancers", component: FreelancerListComponent},
];
