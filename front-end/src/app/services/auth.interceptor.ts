import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.tokenService.getToken();

    if (!authToken) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        'x-auth-token': authToken,
      },
    });
    return next.handle(authReq);
  }
}
