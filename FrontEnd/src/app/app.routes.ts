import { Routes } from '@angular/router';
import { TopicsComponent } from './Component/topics/topics.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/auth/login/login.component';
import { RegisterComponent } from './Component/auth/register/register.component';

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
  {
    path: 'register/topics',
    component: TopicsComponent,
  },
];
