import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiURL = 'https://angularproject-rokp.onrender.com/api';
  // private apiURL = 'http://localhost:7010/api';

  constructor(private httpClient: HttpClient) {}
  createClient(body: any) {
    return this.httpClient
      .post(this.apiURL + '/clients', body, { observe: 'response' })
      .pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;

          return { statusCode, responseBody };
        })
      );
  }
  createFreeLancer(body: any) {
    return this.httpClient
      .post(this.apiURL + '/Freelancer', body, { observe: 'response' })
      .pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;
          return { statusCode, responseBody };
        })
      );
  }
}
