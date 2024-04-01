import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EnterMailComponent } from './components/auth/enter-mail/enter-mail.component';
import { FreelancerListComponent } from './components/freelancer-list/freelancer-list.component';

import { HomeComponent } from './components/home/home.component';
import { TopicsComponent } from './components/topics/topics.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'portfolio-list', component: PortfolioListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/reset/mail', component: EnterMailComponent },
  { path: 'login/reset/password', component: NewPasswordComponent },
  { path: 'freelancers', component: FreelancerListComponent },
];
