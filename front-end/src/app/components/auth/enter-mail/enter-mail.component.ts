import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-enter-mail',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './enter-mail.component.html',
  styleUrl: './enter-mail.component.css',
})
export class EnterMailComponent {
  valid = true;
  mail: String = '';
  constructor(private authService: AuthService, private router: Router) {}

  submit(event: Event) {
    event.preventDefault();
    console.log(this.mail);
  }
}
