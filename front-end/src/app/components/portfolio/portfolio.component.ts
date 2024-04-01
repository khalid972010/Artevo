import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

////
import { Component ,Input,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule],
  providers:[PortfolioService],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  constructor(private dialog: MatDialog,private portfolioService: PortfolioService) { }
  ngOnInit() {
    console.log(this.portfolio);
    if (this.portfolio.likes.includes('660091b08b6161e112617698')) {
      this.IsLike = true;
      this.LikeText = "UnLike";
    } else {
      this.IsLike = false;
      this.LikeText = "Like";
    }
    console.log(this.portfolio.photos[0]);
  }
  @Input() portfolio: any;
  LikeText:any;
  IsLike:boolean=false;
  openImageModal(imageUrl: string, freelancer:any): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl, freelancer }

    });
  }

  likePost(portfolioId: string, userId: string) {
    if(this.IsLike)
    {
     this.LikeText="UnLike";
     this.IsLike=false;
    }
    else
    {
     this.LikeText="Like";
     this.IsLike=true;
    }
    this.portfolioService.like(portfolioId, userId).subscribe(
      (res) => {},
      (error) => {
        console.error(error);
      }
    );
  }
}




/*

import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

////
import { Component ,Input,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';




@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports:[CommonModule],
  providers:[PortfolioService],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})


export class PortfolioComponent implements OnInit {
  constructor(private dialog: MatDialog,private portfolioService: PortfolioService) { }
  ngOnInit() {
    console.log(this.portfolio);
    if (this.portfolio.likes.includes('660091b08b6161e112617698')) {
      this.IsLike = true;
      this.LikeText = "UnLike";
    } else {
      this.IsLike = false;
      this.LikeText = "Like";
    }
  }
  @Input() portfolio: any;
  LikeText:any;
  IsLike:boolean=false;
  openImageModal(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl }
    });
  }

  likePost(portfolioId: string, userId: string) {
    if(this.IsLike)
    {
     this.LikeText="UnLike";
     this.IsLike=false;
    }
    else
    {
     this.LikeText="Like";
     this.IsLike=true;
    }
    this.portfolioService.like(portfolioId, userId).subscribe(
      (res) => {},
      (error) => {
        console.error(error);
      }
    );
  }
}





 */
