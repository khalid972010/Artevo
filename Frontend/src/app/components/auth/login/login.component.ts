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
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, TokenService],

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
    private tokenService: TokenService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onSubmit() {
    if (!this.form.valid) {
      this.valid = false;
    } else {
      this.authService
        .loginUser(this.form.value.email, this.form.value.password)
        .subscribe({
          next: (next) => {
            this.valid = true;
            let user = this.tokenService.getUser();
            if (next.responseBody.type === 'Admin') {
              this.router.navigate(['/dashboard'], { replaceUrl: true });
            } else {
              this.router.navigate(['/'], { replaceUrl: true }).then(() => {
                // Reload the page after navigation
                location.reload();
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.valid = false;
            this.defaultError = err.error;
          },
        });
    }
  }
}
