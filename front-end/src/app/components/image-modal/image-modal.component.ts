import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FreelancerService } from '../../services/freelancer.service';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  imports: [HttpClientModule, RouterModule],
  standalone: true,
  providers: [FreelancerService, AuthService, TokenService, ClientService],
})
export class ImageModalComponent implements OnInit {
  freelancer: any;
  token: any;
  client: any;
  followText: string = 'follow';
  isFollowing = false;
  isLiked = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { portfolio: any },
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private authService: AuthService,
    private freelancerService: FreelancerService,
    private userToken: TokenService,
    private clientService: ClientService
  ) {}
  ngOnInit(): void {
    this.initializeClientAndToken();
    this.getFreelancerData();
    this.checkIfClientFollowsFreelancer();
    this.checkIfClientLikesPost();
  }

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
      this.followText = 'unfollow';
    }
  }

  checkIfClientLikesPost() {
    console.log(this.data.portfolio._id);

    if (this.data.portfolio.likes?.includes(this.client._id)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  checkFollowing(freelancerID: string) {
    if (this.isFollowing == true) {
      this.unfollowFreelancer(this.data.portfolio.ownerID);
    } else {
      this.followFreelancer(this.data.portfolio.ownerID);
    }
  }
  checkLikes() {
    if (this.isLiked) {
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
