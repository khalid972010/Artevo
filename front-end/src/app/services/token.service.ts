import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static token: string | null = null;
  private static resetToken: string | null = null;
  private static user: string | null = null;

  constructor() {}

  setToken(token: string | null) {
    localStorage.setItem('token', token!);
  }

  setResetToken(token: string | null) {
    localStorage.setItem('resetToken', token!);
  }

  setUser(user: any | null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getResetToken(): string | null {
    return localStorage.getItem('resetToken');
  }

  getUser(): any | null {
    let user = localStorage.getItem('user');
    return JSON.parse(user!);
  }
}
