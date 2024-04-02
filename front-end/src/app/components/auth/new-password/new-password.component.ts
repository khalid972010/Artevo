import { Component, OnInit } from '@angular/core';
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
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, UserService],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;
  valid = true;
  mail: string | null = null;
  resetToken: string | null = null;
  defaultError = 'Invalid Password!';
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.resetToken = params.get('token');
    });

    this.tokenService.setResetToken(this.resetToken);
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
    } else if (!this.form.valid) {
      console.log(this.form);
      this.valid = false;
      this.defaultError = 'Invalid password!';
    } else {
      console.log(this.resetToken);
      this.userService
        .updatePassword(this.form.value.password, this.resetToken)
        .subscribe({
          next: () => {
            alert('Updated succesfully!');
            setTimeout(
              () =>
                this.router.navigate(['/login'], {
                  replaceUrl: true,
                }),
              2000
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
