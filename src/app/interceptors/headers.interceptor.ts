import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      req = req.clone({
        setHeaders: {
          authorization: 'Bearer ' + this.authService.getToken(),
        }
      });
    }
    return next.handle(req);
  }
}
