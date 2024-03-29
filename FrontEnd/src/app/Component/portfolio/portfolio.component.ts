import { Component ,Input,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';




@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule],
  providers:[PortfolioService],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  constructor(private portfolioService: PortfolioService) {}
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
