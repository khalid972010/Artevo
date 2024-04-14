import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  DB_URL = 'https://angularproject-rokp.onrender.com/api/';
  token: string | null = '';
  static email: string | null = null;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  loginUser(email: string, password: string): Observable<any> {
    const url = this.DB_URL + 'users/login';
    return this.http
      .post<any>(url, { email, password }, { observe: 'response' })
      .pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;
          const token = response.headers.get('x-auth-token');
          if (token) {
            this.tokenService.setToken(token);
          }
          if (statusCode === 200 && responseBody) {
            const user = responseBody;
            this.tokenService.setUser(user['user']);
          }

          return { statusCode, responseBody };
        })
      );
  }
}
