import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  DB_URL = 'https://angularproject-rokp.onrender.com/api/reviews/';
  // private DB_URL = 'http://localhost:7010/api/reviews/';

  static token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
    ReviewService.token = tokenService.getToken();
  }
  getFreelancerReviews(freelancerID: string) {
    const url = this.DB_URL + freelancerID;
    return this.http.get(url);
  }
  addReview(
    freelancerID: string,
    token: string,
    description: string,
    rate: number
  ) {
    const url = this.DB_URL + freelancerID;

    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http
      .post(
        url,
        { description, rate },
        { observe: 'response', headers: headers }
      )
      .pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;

          return { statusCode, responseBody };
        })
      );
  }
}
