import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FreelancerService } from '../../services/freelancer.service';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  imports: [HttpClientModule, RouterModule, CommonModule],
  standalone: true,
  providers: [FreelancerService, AuthService, TokenService, ClientService],
})
export class ImageModalComponent implements OnInit {
  freelancer: any;
  token: any;
  client: any;
  followText: string = 'Follow';
  isFollowing = false;
  isLiked = false;
  constructor(
    @Inject(ClientService) private clientService: ClientService,

    @Inject(MAT_DIALOG_DATA)
    public data: { portfolio: any },
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private freelancerService: FreelancerService,
    private userToken: TokenService
  ) {
    this.initializeClientAndToken();
    this.getFreelancerData();
    this.checkIfClientFollowsFreelancer();
    this.checkIfClientLikesPost();
  }
  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }

  handleModalContentClick(event: Event) {
    if ((event.target as HTMLElement)?.classList.contains('closingModal')) {
      this.closeModal(); // Call your closeModal function here
    }
  }

  initializeClientAndToken() {
    this.client = this.userToken.getUser();
    this.token = this.userToken.getToken();
  }

  getFreelancerData() {
    this.freelancerService
      .getFreelancerByID(this.data.portfolio.ownerID)
      .subscribe({
        next: (data) => {
          this.freelancer = data.data;
        },
        error: (error) => {
          alert(error);
        },
      });
  }
  checkIfClientFollowsFreelancer() {
    if (this.client.following.includes(this.data.portfolio.ownerID)) {
      this.isFollowing = true;
      this.followText = 'Unfollow';
    }
  }

  checkIfClientLikesPost() {
    if (this.data.portfolio.likes?.includes(this.client._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  checkFollowing() {
    if (this.isFollowing == true) {
      this.unfollowFreelancer(this.data.portfolio.ownerID);
    } else {
      this.followFreelancer(this.data.portfolio.ownerID);
    }
  }
  handleCheckLikes(event: Event) {
    event.preventDefault();
    this.checkLikes();
  }
  checkLikes() {
    if (!this.isLiked) {
      this.likePost(this.data.portfolio._id);
    } else {
      this.unlikePost(this.data.portfolio._id);
    }
  }

  followFreelancer(freelancerID: string) {
    this.clientService.followFreelancer(this.token, freelancerID).subscribe({
      next: () => {
        this.isFollowing = true;
        this.followText = 'unfollow';
        this.client.following.push(freelancerID);
        localStorage.setItem('user', JSON.stringify(this.client));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  unfollowFreelancer(freelancerID: string) {
    this.clientService.unfollowFreelancer(this.token, freelancerID).subscribe({
      next: () => {
        this.isFollowing = false;
        this.followText = 'follow';
        let index = this.client.following.indexOf(freelancerID);

        if (index !== -1) {
          this.client.following.splice(index, 1);
        }

        localStorage.setItem('user', JSON.stringify(this.client));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  likePost(postID: string) {
    this.clientService.likePost(this.token, postID).subscribe({
      next: () => {
        this.isLiked = true;
        this.data.portfolio.likes.push(this.client._id);
        this.data.portfolio.likesCount += 1;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  unlikePost(postID: string) {
    this.clientService.unlikePost(this.token, postID).subscribe({
      next: () => {
        this.isLiked = false;
        let index = this.data.portfolio.likes.indexOf(this.client._id);

        if (index !== -1) {
          this.data.portfolio.likes.splice(index, 1);
        }
        this.data.portfolio.likesCount -= 1;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
