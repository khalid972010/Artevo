import { CommonModule } from '@angular/common';
import { Component, Output ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';import { PortfolioService  } from '../../services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';

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
  selectedFreelancerJobTitle:String="";
  selectedFreelancerBudget: { max: Number, min: Number } = { max: 1000, min: 0 };

    ShowPortfolioTechnology: boolean = false;
  PortfolioFilter: boolean = false;
  FreelancersFilter: boolean = false;
  ShowBudget: boolean = false;
  ShowFreelancerJobTitle = false;
  ShowFreelancerLocation = false;
  showFilterOptions: boolean = false;
  selectedLocation = '';
  @Output() filteredPortfolio: EventEmitter<any> = new EventEmitter<any>();
  @Output() filteredFreelancer: EventEmitter<any> = new EventEmitter<any>();
  // Array to store selected technologies
  constructor(private portfolioService: PortfolioService ,private freelancerService:FreelancerService) {}

  toggleShowPortfolioTechnology() {
    this.ShowPortfolioTechnology = !this.ShowPortfolioTechnology;
  }

  toggleFreelancersFilter() {
    this.FreelancersFilter = !this.FreelancersFilter;
  }
  togglePortfolioFilter() {
    this.PortfolioFilter = !this.PortfolioFilter;
  }
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  toggleShowBudget() {
    this.ShowBudget = !this.ShowBudget;
  }
  toggleShowFreelancerJobTitle() {
    this.ShowFreelancerJobTitle = !this.ShowFreelancerJobTitle;
  }
  toggleShowFreelancerLocation() {
    this.ShowFreelancerLocation = !this.ShowFreelancerLocation;
  }
  updateSelectedFreelancerLocation(location: string) {
    this.selectedFreelancerLocation = location;
    console.log(this.selectedFreelancerLocation);
    this.Freelancerfilter();
  }

  resetFilters() {
    // Reset selected location to default
    this.selectedLocation = '';
    this.selectedPortfolioTechnologies=[];
    this.selectedFreelancerJobTitle="";
    // Reset other filter options to default state
    // (including hiding options, unchecking radio buttons, etc.)
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
    console.log(this.selectedPortfolioTechnologies);
    this.Portfoliofilter();
  }
  updateSelectedFreelancerJobTitle(JobTitle:string) {
    this.selectedFreelancerJobTitle = JobTitle;
    console.log(this.selectedFreelancerJobTitle);
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

    this.freelancerService.filter(this.selectedFreelancerBudget,this.selectedFreelancerJobTitle,this.selectedFreelancerLocation).subscribe(
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
