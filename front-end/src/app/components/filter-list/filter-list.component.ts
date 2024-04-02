import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.css',
})
export class FilterListComponent {
  selectedPortfolioTechnologies: string[] = [];
  ShowPortfolioTechnology: boolean = false;
  PortfolioFilter: boolean = false;
  FreelancersFilter: boolean = false;
  ShowBudget: boolean = false;
  ShowFreelancerTechnology = false;
  ShowFreelancerLocation = false;
  showFilterOptions: boolean = false;

  // Array to store selected technologies
  constructor() {}

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
  toggleShowFreelancerTechnology() {
    this.ShowFreelancerTechnology = !this.ShowFreelancerTechnology;
  }
  toggleShowFreelancerLocation() {
    this.ShowFreelancerLocation = !this.ShowFreelancerLocation;
  }

  updateSelectedFreelancerLocation(event: any) {}
  updateSelectedTechnologies(event: any) {}
  updateSelectedFreelancerTechnology(event: any) {}
  updateSelectedbudget(x: Number, y: Number) {}
}
