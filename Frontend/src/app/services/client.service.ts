import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // DB_URL = 'https://angularproject-rokp.onrender.com/api/clients/';
  private DB_URL = 'http://localhost:7010/api/clients/';


  static token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
    ClientService.token = tokenService.getToken();
  }

  getByID(clientID: string) {
    const url = this.DB_URL + clientID;
    return this.http.get<any>(url, {});
  }
  followFreelancer(client: any, freelancerID: string) {
    const url = this.DB_URL + 'follow/' + freelancerID;
    return this.http.post(url, {client});
  }

  unfollowFreelancer(client: any, freelancerID: string) {
    const url = this.DB_URL + 'unfollow/' + freelancerID;
    return this.http.post(url, {client});
  }

  likePost(token: string, postID: string) {
    const url = this.DB_URL + 'like/' + postID;
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http
      .post(url, {}, { observe: 'response', headers: headers })
      .pipe(
        map((response) => {
          console.log(response);

          const statusCode = response.status;
          const responseBody = response.body;

          return { statusCode, responseBody };
        })
      );
  }

  unlikePost(token: string, postID: string) {
    const url = this.DB_URL + 'unlike/' + postID;
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http
      .post(url, {}, { observe: 'response', headers: headers })
      .pipe(
        map((response) => {
          console.log(response);
          const statusCode = response.status;
          const responseBody = response.body;

          return { statusCode, responseBody };
        })
      );
  }
}
