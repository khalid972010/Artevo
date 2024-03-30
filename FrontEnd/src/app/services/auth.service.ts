import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  DB_URL = 'http://localhost:7010/api/';
  token: string | null = '';
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    const url = this.DB_URL + 'users/login';
    return this.http
      .post(url, { email, password }, { observe: 'response' })
      .pipe(
        map((response) => {
          this.token = response.headers.get('x-auth-token');
          return response.body;
        })
      );
  }
}
