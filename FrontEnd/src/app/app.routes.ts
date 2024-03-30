import { Routes } from '@angular/router';
import { TopicsComponent } from './Component/topics/topics.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/auth/login/login.component';
import { RegisterComponent } from './Component/auth/register/register.component';
import { EnterMailComponent } from './Component/auth/enter-mail/enter-mail.component';
import { NewPasswordComponent } from './Component/auth/new-password/new-password.component';

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
    path: 'login/reset/mail',
    component: EnterMailComponent,
  },

  {
    path: 'login/reset/newPassword',
    component: NewPasswordComponent,
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
