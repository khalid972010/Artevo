import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  DB_URL = 'http://localhost:7010/api/users/';
  token: string | null = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  updateUserByMail(email: string, newValues: object): Observable<any> {
    var user;
    this.findByMail(email).subscribe({
      next: (value) => {
        user = value;
      },
      error: (err) => {
        throw new Error(err.toString());
      },
    });
    if (user) {
      const url = this.DB_URL + user['_id'];
      return this.http.patch(url, newValues, { observe: 'response' }).pipe(
        map((response) => {
          const statusCode = response.status;
          const responseBody = response.body;

          return { statusCode, responseBody };
        })
      );
    }
    throw new Error();
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
}
