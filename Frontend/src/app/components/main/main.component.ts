
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutComponent } from '../about/about.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FooterComponent } from '../footer/footer.component';


/////
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfoliosMainComponent } from '../portfolios-main/portfolios-main.component';
import { PaymentComponent } from '../payment/payment.component';





@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AboutComponent,
    NavbarComponent,
    PortfoliosMainComponent,
    PaymentComponent
    ],
    providers:[PortfolioService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

}



/*
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { PortfolioService } from '../../services/portfolio.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,
            PortfolioComponent,
            RouterModule,
            CommonModule,
            AboutComponent,
            NavbarComponent
            ],
            providers:[PortfolioService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent  implements OnInit {
  Portfolio:any;
 constructor (private portfolioService:PortfolioService){}
 ngOnInit(): void {
 this.portfolioService.getAllPortfolio().subscribe(
   (data)=>{
     console.log(data);
     if (data)
      this.Portfolio = data;

   },
   (err)=>{console.log(err)});
 }

}





 */
