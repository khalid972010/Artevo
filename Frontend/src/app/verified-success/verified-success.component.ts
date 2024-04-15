import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verified-success',
  standalone: true,
  imports: [],
  providers: [UserService],
  templateUrl: './verified-success.component.html',
  styleUrl: './verified-success.component.scss',
})
export class VerifiedSuccessComponent implements OnInit {
  token: string | null = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get('token');
    });
    this.userService.verifyUser(this.token!).subscribe({
      next: () => {},
      error: () => {},
    });
  }
}
