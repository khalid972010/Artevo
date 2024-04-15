import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FreelancerService } from '../../services/freelancer.service';
import { Router, RouterModule } from '@angular/router';
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
  portfolio: any;
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
    private userToken: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    localStorage.setItem('portfolioItem', JSON.stringify(this.data.portfolio));
    this.portfolio = JSON.parse(localStorage.getItem('portfolioItem') ?? '');
    this.initializeClientAndToken();
    this.getFreelancerData();
    if (this.client) {
      this.checkIfClientFollowsFreelancer();
      this.checkIfClientLikesPost();
    }
  }

  clickName() {
    if (this.client) {
      const url = '/freelancer/' + this.portfolio.ownerID;
      this.router.navigate([url], { replaceUrl: true });
      this.closeModal();
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
      this.closeModal();
    }
  }

  initializeClientAndToken() {
    this.client = this.userToken.getUser();
    this.token = this.userToken.getToken();
  }

  getFreelancerData() {
    this.freelancerService.getFreelancerByID(this.portfolio.ownerID).subscribe({
      next: (data) => {
        this.freelancer = data.data;
      },
      error: (error) => {
        alert(error);
      },
    });
  }
  checkIfClientFollowsFreelancer() {
    if (this.client.following?.includes(this.portfolio.ownerID)) {
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
    if (!this.client) {
      this.router.navigate(['/login'], { replaceUrl: true });
      this.closeModal();
    } else {
      if (this.isFollowing == true) {
        this.unfollowFreelancer(this.portfolio.ownerID);
      } else {
        this.followFreelancer(this.portfolio.ownerID);
      }
    }
  }
  handleCheckLikes(event: Event) {
    if (!this.client) {
      this.router.navigate(['/login'], { replaceUrl: true });
      this.closeModal();
    } else if (this.client.userType == 'Client') {
      event.preventDefault();
      this.checkLikes();
    }
  }
  checkLikes() {
    if (!this.isLiked) {
      this.likePost(this.portfolio._id);
    } else {
      this.unlikePost(this.portfolio._id);
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
        this.portfolio.likesCount += 1;
        this.portfolio.likes.push(this.client._id);
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
        let index = this.portfolio.likes.indexOf(this.client._id);

        if (index !== -1) {
          this.portfolio.likes.splice(index, 1);
        }
        this.portfolio.likesCount -= 1;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  handleModalContentClick(event: Event) {
    if ((event.target as HTMLElement)?.classList.contains('closingModal')) {
      this.closeModal();
    }
  }
}
