import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiURL = 'http://localhost:7010/api';
  constructor(private httpClient: HttpClient) {}
  createClient(body: any) {
    return this.httpClient.post(this.apiURL + '/clients', body);
  }
  createFreeLancer(body: any) {
    return this.httpClient.post(this.apiURL + '/Freelancer', body);
  }
}
