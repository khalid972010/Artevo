import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  DB_URL = 'https://angularproject-rokp.onrender.com/api/clients/';
  static token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
    ClientService.token = tokenService.getToken();
  }

  followFreelancer(token: string, freelancerID: string) {
    const url = this.DB_URL + 'follow/' + freelancerID;
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.post(url, {}, { headers: headers });
  }

  unfollowFreelancer(token: string, freelancerID: string) {
    const url = this.DB_URL + 'unfollow/' + freelancerID;
    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.post(url, {}, { headers: headers });
  }
}
