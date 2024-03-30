import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { register } from 'module';

import { Router } from '@angular/router';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fullName = '';
  userName = '';
  email = '';
  password = '';
  type = '';
  constructor(private service: RegisterService, private router: Router) {}
  addUser() {
    if (this.fullName.length >= 5 && this.email.includes('@')) {
      let obj = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        userType: this.type,
      };
      if (obj.userType == 'Client') {
        this.service.createClient(obj).subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: (error) => {
            console.log('the error in Client Component' + error);
          },
        });
      } else if (obj.userType == 'Freelancer') {
        this.service.createFreeLancer(obj).subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: (error) => {
            console.log('the error in freelancer component' + error);
          },
        });
      }
    }
  }
  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
