import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-enter-mail',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule],
  providers: [UserService, AuthService],
  templateUrl: './enter-mail.component.html',
  styleUrl: './enter-mail.component.css',
})
export class EnterMailComponent {
  valid = true;
  mail: string = '';
  constructor(
    private usersService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  submit(event: Event) {
    event.preventDefault();
    this.usersService.sendResetToken(this.mail).subscribe({
      next: () => {
        this.valid = true;

        alert('A mail has been sent to you, please check your email!');
      },
      error: () => {
        this.valid = false;
      },
    });
  }
}
