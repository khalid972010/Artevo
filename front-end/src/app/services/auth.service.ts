import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  DB_URL = 'http://localhost:7010/api/';
  token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  loginUser(email: string, password: string): Observable<any> {
    const url = this.DB_URL + 'users/login';
    return this.http
      .post(url, { email, password }, { observe: 'response' })
      .pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;
          this.token = response.headers.get('x-auth-token');
          this.tokenService.setToken(this.token);

          return { statusCode, responseBody };
        })
      );
  }

  findByMail(email: string): Observable<any> {
    const url = this.DB_URL + 'users/login/' + email;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response) => {
        const statusCode = response.status;
        const responseBody = response.body;

        return { statusCode, responseBody };
      })
    );
  }
}
