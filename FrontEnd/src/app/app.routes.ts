import { Routes } from '@angular/router';
import { LoginComponent } from './Component/auth/login/login.component';
import { RegisterComponent } from './Component/auth/register/register.component';
import { HomeComponent } from './Component/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
