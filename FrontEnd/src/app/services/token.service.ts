import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.token = this.tokenSubject.asObservable();
  }

  setToken(token: string | null) {
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }
}
