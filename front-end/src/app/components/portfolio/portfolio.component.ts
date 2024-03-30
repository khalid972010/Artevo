import { Component } from '@angular/core';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  constructor(private dialog: MatDialog) { }

  openImageModal(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl }
    });
  }
}
