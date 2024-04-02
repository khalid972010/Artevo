import { Component, Output ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers:[PortfolioService],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.css',
})
export class FilterListComponent {
  selectedPortfolioTechnologies: string[] = [];
  ShowPortfolioTechnology: boolean = false;
  showPortfolioFilter: boolean = false;
  FreelancersFilter: boolean = false;
  ShowBudget: boolean = false;
  ShowFreelancerJopTitle = false;
  ShowFreelancerLocation = false;
  showFilterOptions: boolean = false;
  @Output() filteredPortfolio: EventEmitter<any> = new EventEmitter<any>();
  constructor(private portfolioService: PortfolioService) {}

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
  updateSelectedFreelancerLocation(event: any) {}
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
  updateSelectedFreelancerJopTitle(event: any) {}
  updateSelectedbudget(x: Number, y: Number) {}

  Portfoliofilter() {

    this.portfolioService.filter(this.selectedPortfolioTechnologies).subscribe(
      (res) => {
        //console.log(res);
       this.filteredPortfolio.emit(res); // Emit the filtered portfolio data
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
