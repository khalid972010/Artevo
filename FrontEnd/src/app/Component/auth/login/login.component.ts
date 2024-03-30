import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],

  standalone: true,
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  form: FormGroup;
  valid = true;
  defaultError = 'Invalid mail or password!';
  passwordFieldType: string = 'password';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.valid = false;
    } else {
      this.authService
        .loginUser(this.form.value.email, this.form.value.password)
        .subscribe({
          next: () => {
            this.valid = true;
            this.router.navigate(['/'], { replaceUrl: true });
          },
          error: (err) => {
            this.valid = false;
            this.defaultError = err.error;
          },
        });
    }
  }
}
