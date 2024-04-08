import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private selectedTopic!: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  private apiUrl = 'https://angularproject-rokp.onrender.com/api/users';
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
          'x-auth-token': this.tokenService.getToken()!,
        },
      }
    );
  }
}
