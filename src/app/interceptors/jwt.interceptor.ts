import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private location: Location) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {
        if (error.status !== 401) {
          throw error;
        }
        return this.authService.refreshToken().then(res => {
          req = this.setHeaders(req);
          return next.handle(req).toPromise().then(res => res);
        });
      }) as any;
  }
  private setHeaders(req) {
    return req.clone({
      setHeaders: {
        authorization: 'Bearer ' + this.authService.getToken(),
      }
    });
  }
}
