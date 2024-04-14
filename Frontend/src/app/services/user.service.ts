import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  DB_URL = 'https://angularproject-rokp.onrender.com/api/users/';
  // DB_URL = 'http://localhost:7010/api/users/';
  token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  updatePassword(
    newPassword: String,
    resetToken: String | null
  ): Observable<any> {
    const url = this.DB_URL + 'reset-password-submit/' + resetToken;
    let body = {
      newPassword: newPassword,
    };
    return this.http.post(url, body, { observe: 'response' }).pipe(
      map((response) => {
        const statusCode = response.status;
        const responseBody = response.body;
        return { statusCode, responseBody };
      })
    );
  }

  sendResetToken(email: string): Observable<any> {
    const url = this.DB_URL + 'send-reset-password';
    return this.http.post(url, { email }, { observe: 'response' }).pipe(
      map((response) => {
        const statusCode = response.status;
        const responseBody = response.body;

        return { statusCode, responseBody };
      })
    );
  }

  findByMail(email: string): Observable<any> {
    const url = this.DB_URL + 'email/' + email;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response) => {
        const statusCode = response.status;
        const responseBody = response.body;

        return { statusCode, responseBody };
      })
    );
  }

  UpdateUser(updatedUser: any) {
    return this.http.patch(this.DB_URL, updatedUser);
  }
}
