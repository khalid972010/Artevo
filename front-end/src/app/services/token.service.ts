import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static tokenSubject: BehaviorSubject<string | null>;
  private static resetTokenSubject: BehaviorSubject<string | null>;
  private static userSubject: BehaviorSubject<any | null>;
  private static token: Observable<string | null>;
  private static resetToken: Observable<string | null>;
  private static user: Observable<any | null>;

  constructor() {
    TokenService.tokenSubject = new BehaviorSubject<string | null>(null);
    TokenService.resetTokenSubject = new BehaviorSubject<string | null>(null);
    TokenService.userSubject = new BehaviorSubject<any | null>(null);
    TokenService.token = TokenService.tokenSubject.asObservable();
    TokenService.resetToken = TokenService.resetTokenSubject.asObservable();
    TokenService.user = TokenService.userSubject.asObservable();
  }

  setToken(token: string | null) {
    TokenService.tokenSubject.next(token);
  }

  setResetToken(token: string | null) {
    TokenService.resetTokenSubject.next(token);
  }

  setUser(user: any | null) {
    console.log(user);
    TokenService.userSubject.next(user);
  }

  getToken(): string | null {
    return TokenService.tokenSubject.getValue();
  }

  getResetToken(): string | null {
    return TokenService.resetTokenSubject.getValue();
  }

  getUser(): any | null {
    return TokenService.userSubject.getValue();
  }
}
