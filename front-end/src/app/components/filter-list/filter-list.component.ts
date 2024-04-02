import { Component, Output ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService  } from '../../services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers:[PortfolioService,FreelancerService],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.css',
})
export class FilterListComponent {
  selectedPortfolioTechnologies: string[] = [];
  selectedFreelancerLocation:String="";
  selectedFreelancerJopTitle:String="";
  selectedFreelancerBudget: { max: Number, min: Number } = { max: 1000, min: 0 };

  ShowPortfolioTechnology: boolean = false;
  showPortfolioFilter: boolean = false;
  FreelancersFilter: boolean = false;
  ShowBudget: boolean = false;
  ShowFreelancerJopTitle = false;
  ShowFreelancerLocation = false;
  showFilterOptions: boolean = false;
  @Output() filteredPortfolio: EventEmitter<any> = new EventEmitter<any>();
  @Output() filteredFreelancer: EventEmitter<any> = new EventEmitter<any>();
  constructor(private portfolioService: PortfolioService ,private freelancerService:FreelancerService) {}

  toggleShowPortfolioTechnology() {
    this.ShowPortfolioTechnology = !this.ShowPortfolioTechnology;
  }
  toggleFreelancersFilter() {
    this.FreelancersFilter = !this.FreelancersFilter;
  }
  togglePortfolioFilter() {
    this.showPortfolioFilter = !this.showPortfolioFilter;
  }
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }
  toggleShowBudget() {
    this.ShowBudget = !this.ShowBudget;
  }
  toggleShowFreelancerJopTitle() {
    this.ShowFreelancerJopTitle = !this.ShowFreelancerJopTitle;
  }
  toggleShowFreelancerLocation() {
    this.ShowFreelancerLocation = !this.ShowFreelancerLocation;
  }
  updateSelectedFreelancerLocation(location: string) {
    this.selectedFreelancerLocation = location;
    console.log(this.selectedFreelancerLocation);
    this.Freelancerfilter();
  }
  updateSelectedTechnologies(event: any) {
    const technology = event.target.value;
    if (event.target.checked) {
      this.selectedPortfolioTechnologies.push(technology);
    } else {
      const index = this.selectedPortfolioTechnologies.indexOf(technology);
      if (index !== -1) {
        this.selectedPortfolioTechnologies.splice(index, 1);
      }
    }
   // console.log(this.selectedPortfolioTechnologies);
    this.Portfoliofilter();
  }
  updateSelectedFreelancerJopTitle(JopTitle:string) {
    this.selectedFreelancerJopTitle = JopTitle;
    console.log(this.selectedFreelancerJopTitle);
    this.Freelancerfilter();
  }
  updateSelectedbudget(x: Number, y: Number) {
    this.selectedFreelancerBudget.min = x;
    this.selectedFreelancerBudget.max=y;

    console.log(this.selectedFreelancerBudget);
    this.Freelancerfilter();
  }

  Portfoliofilter() {

    this.portfolioService.filter(this.selectedPortfolioTechnologies).subscribe(
      (res) => {
        console.log(res);
       this.filteredPortfolio.emit(res); // Emit the filtered portfolio data
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Freelancerfilter() {

    this.freelancerService.filter(this.selectedFreelancerBudget,this.selectedFreelancerJopTitle,this.selectedFreelancerLocation).subscribe(
      (res) => {
        console.log("res")
        console.log(res);
       this.filteredFreelancer.emit(res); // Emit the filtered portfolio data
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
