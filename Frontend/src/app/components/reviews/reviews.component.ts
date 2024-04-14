import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { SingleReviewComponent } from '../single-review/single-review.component';
import { FreelancerService } from '../../services/freelancer.service';
import { ReviewService } from '../../services/review.service';
import { LoadingComponent } from '../../loading/loading.component';
import { StarsComponent } from './stars/stars.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  providers: [TokenService, ReviewService],
  imports: [
    SingleReviewComponent,
    LoadingComponent,
    StarsComponent,
    FormsModule,
  ],
})
export class ReviewsComponent implements OnInit {
  @Input() freelancerID: string = '';
  currentUser: any;
  reviews: any;
  canReview: Boolean = false;
  reviewedBefore: Boolean = false;
  error: Boolean = false;
  reviewText = null;
  previousReviewText: string = '';
  previousReviewRate: number = 0;
  rating = 0;
  constructor(
    private tokenService: TokenService,
    private reviewService: ReviewService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.reviewService.getFreelancerReviews(this.freelancerID).subscribe({
      next: (data) => {
        this.reviews = data;
        this.initalizeReviewBox();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initalizeReviewBox() {
    this.canReview = this.currentUser.previousFreelancers.includes(
      this.freelancerID
    );

    for (let i = 0; i < this.reviews.length; i++) {
      if (
        this.reviews[i].from == this.currentUser._id &&
        this.reviews[i].to == this.freelancerID
      ) {
        this.reviewedBefore = true;
      }
    }
    if (this.reviewedBefore) {
      this.fetchPreviousReview();
    }
  }

  fetchPreviousReview() {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].from == this.currentUser._id) {
        this.previousReviewText = this.reviews[i].description;
        this.previousReviewRate = this.reviews[i].rate;
      }
    }
  }

  submitReview() {
    if (this.reviewText) {
      this.reviewService
        .addReview(
          this.freelancerID,
          this.tokenService.getToken()!,
          this.reviewText,
          this.rating
        )
        .subscribe({
          next: () => {
            window.location.reload();
          },
        });
    } else {
      this.error = true;
    }
  }
}
