import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

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
import { ProfileFreelancerComponent } from './components/profile-freelancer/profile-freelancer.component';
import { ProfileFreelancerUpdateComponent } from './components/profile-freelancer-update/profile-freelancer-update.component';
import { ProfileClientUpdate } from './components/profile-client-update/profile-client-update.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { HireFreelancerComponent } from './hire-freelancer/hire-freelancer.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentValidateComponent } from './components/payment-validate/payment-validate.component';


export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'portfolio-list', component: PortfolioListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/reset/mail', component: EnterMailComponent },
  { path: 'login/reset/password/:token', component: NewPasswordComponent },
  { path: 'freelancers', component: FreelancerListComponent },
  { path: 'freelancer/:id', component: ProfileFreelancerComponent },
  { path: 'profile/freelancer/add-post/:id', component: AddPostComponent },
  { path: 'profile/freelancer/update/:id', component: ProfileFreelancerUpdateComponent },
  {
    path: 'profile/freelancer/update',
    component: ProfileFreelancerUpdateComponent,
  },
  { path: 'profile/client/update/:id', component: ProfileClientUpdate },
  {
    path: 'profile/freelancer/hire-freelancer',
    component: HireFreelancerComponent,
  },
  { path: 'profile/client/:id', component: ProfileClientComponent },
  { path: 'paymentValidate', component: PaymentValidateComponent },
  { path: 'payment/:id', component: PaymentComponent },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Admin',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/dashboard/routes').then((m) => m.routes),
      },

      {
        path: 'listings',
        loadChildren: () => import('../app/theme/routes').then((m) => m.routes),
      },

      {
        path: 'widgets',
        loadChildren: () =>
          import('../app/widgets/routes').then((m) => m.routes),
      },
    ],
  },
  { path: 'admin', component: DefaultLayoutComponent },
  { path: '**', component: NotFoundPageComponent },
];
