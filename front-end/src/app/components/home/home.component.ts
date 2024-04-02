import { Component, Input, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { PortfoliosMainComponent } from '../portfolios-main/portfolios-main.component';
import { FormsModule } from '@angular/forms';
import { FreelancerListComponent } from '../freelancer-list/freelancer-list.component';
import { FilterListComponent } from '../filter-list/filter-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategoryCardComponent,
    CommonModule,
    PortfolioComponent,
    HttpClientModule,
    PortfoliosMainComponent,
    CommonModule,
    FormsModule,
    FreelancerListComponent,
    FilterListComponent
  ],
  providers: [CategoriesService, PortfolioService, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any;
  Portfolio: any;
  selectedCategories: any[] = [];
  @Input() selectedTab: string = 'posts';
  constructor(
    private categoriesData: CategoriesService,
    private portfolioService: PortfolioService
  ) {}
  getCategoryName(categoryName: string) {
    console.log(categoryName);
  }

  ngOnInit(): void {
    this.categories = this.categoriesData.getCategories();
    this.portfolioService.getAllPortfolio().subscribe(
      (data) => {
        console.log(data);
        if (data) this.Portfolio = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
