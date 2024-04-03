import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
    public dialogRef: MatDialogRef<ImageModalComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

 handleModalContentClick(event: Event) {
  if ((event.target as HTMLElement)?.classList.contains('closingModal')) {
    this.closeModal(); // Call your closeModal function here
  }
}

}
