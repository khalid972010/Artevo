import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = 'your-auth-token'; // Replace this with your actual authentication token
    const authReq = req.clone({
      setHeaders: {
        'x-auth-token': authToken,
      },
    });
    return next.handle(authReq);
  }
}
