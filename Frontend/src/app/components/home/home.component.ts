import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { FreelancerService } from '../../services/freelancer.service';
import { FreelancerCardComponent } from '../freelancer-card/freelancer-card.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../loading/loading.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-home',
    standalone: true,
    providers: [CategoriesService, PortfolioService, FreelancerService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        CategoryCardComponent,
        CommonModule,
        PortfolioComponent,
        HttpClientModule,
        PortfoliosMainComponent,
        CommonModule,
        FormsModule,
        FreelancerListComponent,
        FilterListComponent,
        FreelancerCardComponent,
        LoadingComponent
  ],
      animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  categories: any;
  Portfolio: any;
  freelancer:any;
  selectedCategories: any[] = [];
  @Input() selectedTab: string = 'posts';
  selectedChoices: string[] = [];
  constructor(
    private categoriesData: CategoriesService,
    private portfolioService: PortfolioService,
    private freelancerService :FreelancerService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  getSelected() {
    console.log(this.selectedChoices);
    this.selectedChoices = this.categoriesData.getSelectedChoices();
    this.updatePortfolios();
  }

  updatePortfolios() {
    this.portfolioService
      .getPortfolioByCategory(this.selectedChoices)
      .subscribe({
        next: (data) => {
          this.Portfolio = data;
          this.changeDetectorRef.detectChanges();

        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.categories = this.categoriesData.getCategories();
    this.freelancerService.getAllFreelancers().subscribe({
      next: (res) => {
        this.freelancer = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.updatePortfolios();
  }
  receiveFilteredPortfolio(filteredPortfolio: any) {
    this.Portfolio.data = filteredPortfolio;
    console.log("home");
    console.log(this.Portfolio);
  // console.log("2"); // Logging the updated Portfolio
   //console.log(filteredPortfolio);
  }
  // Method to receive filtered freelancer data
  receiveFilteredFreelancer(filteredData: any) {
   this.freelancer.data=filteredData;
   console.log(this.freelancer);
  }
  goToFreelancerProfile(freelancerId: String) {
    //console.log(freelancerId);
    this.router.navigate(['/freelancer', freelancerId]);
  }
}
