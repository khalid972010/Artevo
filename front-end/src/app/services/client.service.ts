import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  followFreelancer(freelancerID: string) {
    const url = this.DB_URL + 'follow/' + freelancerID;
    return this.http.post(url, {});
  }

  unfollowFreelancer(freelancerID: string) {
    const url = this.DB_URL + 'unfollow/' + freelancerID;
    return this.http.post(url, {});
  }
}
