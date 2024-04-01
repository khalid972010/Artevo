import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  form: FormGroup;
  valid = true;
  defaultError = 'Invalid Password!';
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",'),
        ],
      ],
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType =
      this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }
  onSubmit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.valid = false;
      this.defaultError = "Password and Confirm Password Values don't match!";
    }
    if (!this.form.valid) {
      this.valid = false;
    } else {
      // this.authService
      //   .loginUser(this.form.value.email, this.form.value.password)
      //   .subscribe({
      //     next: () => {
      //       this.valid = true;
      //       this.router.navigate(['/'], { replaceUrl: true });
      //     },
      //     error: (err) => {
      //       this.valid = false;
      //       this.defaultError = err.error;
      //     },
      //   });
    }
  }
}
