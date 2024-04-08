import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [FreelancerService, HttpClient],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent{
  @ViewChild('searchQuery') searchQuery?: ElementRef;
  searchResults: any[] = [];
  name: any;
  query: string = '';
  filteredFreelancers: any[] = [];
  showDropdownFlag: boolean = false;

  constructor(
    private freelancerService: FreelancerService,
    private router:Router

  ) {}
  ngOnInit() {
    this.freelancerService.getAllFreelancers().subscribe(
      (res: any) => {
        this.filteredFreelancers = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving freelancers:', error);
      }
    );
  }
  displayFn(freelancer: any): string {
    return freelancer && freelancer.fullName
      ? freelancer.fullName.toString()
      : '';
  }

  searchByFreelancer(query: string) {
    if (query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.freelancerService.searchFreelancers(query).subscribe(
      (res: any) => {
        console.log('Search Results:', res.data);
        this.searchResults = res.data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching for freelancers:', error);
      }
    );
  }

  showDropdown() {
    this.showDropdownFlag = true;
  }

  hideDropdown() {
    setTimeout(() => {
    this.showDropdownFlag= false;
  }, 700); // Adjust the delay time as needed
  }

  NavigateFreelancerProfile(event: Event, freelancer: any) {
  event.preventDefault();

  const navigationExtras: NavigationExtras = {
    queryParams: {
      refresh: new Date().getTime() // Append a timestamp query parameter to force refresh
    },
    queryParamsHandling: 'merge' // Merge with existing query parameters if any
  };

  this.router.navigate(['/freelancer', freelancer._id], navigationExtras);
  this.searchQuery!.nativeElement.value = '';
  this.searchResults = [];
}
}
