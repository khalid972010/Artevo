import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { error } from 'console';

@Component({
  selector: 'app-single-review',
  standalone: true,
  imports: [],
  providers: [ClientService],
  templateUrl: './single-review.component.html',
  styleUrl: './single-review.component.scss',
})
export class SingleReviewComponent implements OnInit {
  @Input() review: any;
  reviewer: any;
  formattedDate: string = '';

  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.clientService.getByID(this.review.from).subscribe({
      next: (client) => {
        this.reviewer = client.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.formatDate();
  }

  formatDate(): void {
    const date = new Date(this.review.date);
    this.formattedDate = date.toLocaleDateString();
  }
}
