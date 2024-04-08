import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule,
  CommonModule,
ReactiveFormsModule],
  providers:[PortfolioService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  constructor(private portfolioService:PortfolioService ,private fb: FormBuilder,private route:ActivatedRoute){}
  @Input() imageUrl?: string;
  selectedCategory:any;
  description:string="";
  freelancerId:any;
  SelectedCategory(e:any)
  {
    console.log(e.target.value);
    this.selectedCategory=e.target.value+"";
  }
  TechnologyForm: FormGroup = new FormGroup({
    skills: new FormArray([new FormControl('')])
  });

  ngOnInit(): void {
    this.TechnologyForm = this.fb.group({
      Technology: this.fb.array([this.fb.control('')])
    });

    this.route.params.subscribe(params => {
      this.freelancerId = params['id'];
      console.log( this.freelancerId);
          });
  }


  NavigateBack() {
  window.history.back();
  }
  handleFileInput(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
}
submit(){
  const currentDate: Date = new Date();

  const formattedDate: string = currentDate.toISOString().split('T')[0];



  this.portfolioService.AddPortfolio({ "date":formattedDate,
                                       "ownerID":this.freelancerId,
                                       "photos":["https://images.unsplash.com/photo-1711968558539-1bcc5b6222db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8fA%3D%3D"],
                                       "description":this.description,
                                       "type":this.selectedCategory,
                                       "technologies":this.TechnologyForm.value.Technology,
                                       "likesCount": 0,
                                       "likes": [],
                                      }).subscribe(
    (res) => {

      console.log(res);
    },
    (error) => {

    }
 );
 window.history.back();
}


get TechnologyControls() {
  return (this.TechnologyForm.get('Technology') as FormArray).controls;
}

addTechnology() {
  (this.TechnologyForm.get('Technology') as FormArray).push(this.fb.control(''));
}

removeTechnology(index: number) {
  (this.TechnologyForm.get('Technology') as FormArray).removeAt(index);
}
}
