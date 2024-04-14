import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
})
export class StarsComponent {
  faStar = faStar;

  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>(); // Declare output property

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating); // Emitting the updated rating back to the parent component
  }
}
