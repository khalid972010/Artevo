import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CategoriesService],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  constructor(private service: CategoriesService) {}
  @Input() title!: string;
  isToggled: boolean = false;
  toggleButton() {
    this.service.setSelectedChoice(this.title);
    this.isToggled = !this.isToggled;
    console.log('this.title');
  }
}
