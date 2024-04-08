import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  selectedTopics: string[] = [];
  chosenTopic = '';
  @Output() selectedTopicEvent = new EventEmitter<string>();
  constructor(private dataService: TopicService, private router: Router) {}
  toggleSelection(title: string): void {
    const index = this.selectedTopics.indexOf(title);
    if (index !== -1) {
      this.selectedTopics.splice(index, 1);
    } else {
      this.selectedTopics.push(title);
    }
    console.log('Selected topics:', this.selectedTopics);
  }

  isSelected(title: string): boolean {
    return this.selectedTopics.includes(title);
  }

  onSubmit() {
    this.chosenTopic = this.selectedTopics[0];
    if (this.chosenTopic) {
      this.dataService.updateTopic(this.chosenTopic).subscribe(
        (response) => {
          console.log('Document updated successfully:', response);
          // Handle success
        },
        (error) => {
          console.error('Error updating document:', error);
          // Handle error
        }
      );
    } else {
      console.log('Please select a topic');
    }
  }
}
