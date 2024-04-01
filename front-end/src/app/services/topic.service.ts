import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private selectedTopic!: string;

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:7010/api/users';
  setSelectedTopic(topic: string) {
    this.selectedTopic = topic;
  }

  getSelectedTopic(): string {
    return this.selectedTopic;
  }

  updateTopic(topic: string) {
    return this.http.patch(
      `${this.apiUrl}`,
      { favTopics: topic },
      {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDFmMzgwZDBkNjJlOThiN2RhNDE5YyIsInR5cGUiOiJDbGllbnQiLCJpYXQiOjE3MTE0MDQ0MTEsImV4cCI6MTcxMjAwOTIxMX0.NTsTQYXoauwCt6ye4TFV_RVo77riblkNI2EyGwtLjac',
        },
      }
    );
  }
}
