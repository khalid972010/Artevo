import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject: BehaviorSubject<string | null>;
  private resetTokenSubject: BehaviorSubject<string | null>;
  private static token: Observable<string | null>;
  private static resetToken: Observable<string | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.resetTokenSubject = new BehaviorSubject<string | null>(null);
    TokenService.token = this.tokenSubject.asObservable();
    TokenService.resetToken = this.resetTokenSubject.asObservable();
  }

  setToken(token: string | null) {
    this.tokenSubject.next(token);
  }

  setResetToken(token: string | null) {
    this.resetTokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  getResetToken(): string | null {
    return this.resetTokenSubject.getValue();
  }
}
