import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject: BehaviorSubject<string | null>;
  private resetTokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<any | null>;
  private static token: Observable<string | null>;
  private static resetToken: Observable<string | null>;
  private static user: Observable<any | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.resetTokenSubject = new BehaviorSubject<string | null>(null);
    this.userSubject = new BehaviorSubject<any | null>(null);
    TokenService.token = this.tokenSubject.asObservable();
    TokenService.resetToken = this.resetTokenSubject.asObservable();
    TokenService.user = this.userSubject.asObservable();
  }

  setToken(token: string | null) {
    this.tokenSubject.next(token);
  }

  setResetToken(token: string | null) {
    this.resetTokenSubject.next(token);
  }

  setUser(user: any | null) {
    this.userSubject.next(user);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  getResetToken(): string | null {
    return this.resetTokenSubject.getValue();
  }

  getUser(): any | null {
    return this.userSubject.getValue();
  }
}
