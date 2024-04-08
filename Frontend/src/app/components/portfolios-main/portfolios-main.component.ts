import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolios-main',
  standalone: true,
  imports: [
    HttpClientModule,
    PortfolioComponent,
    RouterModule,
    CommonModule
  ],
  providers: [PortfolioService],
  templateUrl: './portfolios-main.component.html',
  styleUrl: './portfolios-main.component.css'
})
export class PortfoliosMainComponent implements OnInit{
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
