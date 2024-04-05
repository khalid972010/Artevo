import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  @Input() imageUrl?: string;
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
}
