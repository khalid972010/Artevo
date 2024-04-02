import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, UserService],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  form: FormGroup;
  valid = true;
  mail: string | null = null;
  defaultError = 'Invalid Password!';
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
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
    this.mail = this.authService.getEmail();
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
      this.userService
        .updateUserByMail(this.mail!, {
          password: this.form.value.password,
        })
        .subscribe({
          next: () => {},
        });
    }
  }
}
