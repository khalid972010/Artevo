import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../services/file_upload.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [PortfolioService, FileUploadService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit {
  private imageLink?: string;
  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) {}
  @Input() imageUrl?: string;
  selectedCategory: any;
  description: string = '';
  freelancerId: any;
  SelectedCategory(e: any) {
    console.log(e.target.value);
    this.selectedCategory = e.target.value + '';
  }
  TechnologyForm: FormGroup = new FormGroup({
    skills: new FormArray([new FormControl('')]),
  });

  ngOnInit(): void {
    this.TechnologyForm = this.fb.group({
      Technology: this.fb.array([this.fb.control('')]),
    });

    this.route.params.subscribe((params) => {
      this.freelancerId = params['id'];
      console.log(this.freelancerId);
    });
  }

  NavigateBack() {
    window.history.back();
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      // this.imageUrl = e.target.result;
      this.imageUrl = 'https://i.gifer.com/YlWC.gif';
      if (this.imageUrl !== null) {
        this.imageLink = await this.fileUploadService.uploadAndSaveToDatabase(
          file
        );
      }
      this.imageUrl = this.imageLink;
    };
    reader.readAsDataURL(file);
  }
  submit() {
    const currentDate: Date = new Date();

    const formattedDate: string = currentDate.toISOString().split('T')[0];

    this.portfolioService
      .AddPortfolio({
        date: formattedDate,
        ownerID: this.freelancerId,
        photos: [this.imageLink],
        description: this.description,
        type: this.selectedCategory,
        technologies: this.TechnologyForm.value.Technology,
        likesCount: 0,
        likes: [],
      })
      .subscribe(
        (res) => {
          console.log(res);
          window.history.back();
        },
        (error) => {}
      );
  }

  get TechnologyControls() {
    return (this.TechnologyForm.get('Technology') as FormArray).controls;
  }

  addTechnology() {
    (this.TechnologyForm.get('Technology') as FormArray).push(
      this.fb.control('')
    );
  }

  removeTechnology(index: number) {
    (this.TechnologyForm.get('Technology') as FormArray).removeAt(index);
  }
}
