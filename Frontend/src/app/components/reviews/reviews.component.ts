import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { SingleReviewComponent } from '../single-review/single-review.component';
import { FreelancerService } from '../../services/freelancer.service';
import { ReviewService } from '../../services/review.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  providers: [TokenService, ReviewService],
  imports: [SingleReviewComponent, LoadingComponent],
})
export class ReviewsComponent implements OnInit {
  @Input() freelancerID: string = '';
  currentUser: any;
  reviews: any;
  canReview: Boolean = false;
  reviewedBefore: Boolean = false;
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
      if (this.reviews[i].from == this.currentUser._id) {
        this.reviewedBefore = true;
      }
    }
  }
}
