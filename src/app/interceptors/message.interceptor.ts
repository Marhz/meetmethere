import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { AlertService } from "../alert/alert.service";
import 'rxjs/add/operator/do';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          if(event.body !== null && event.body.hasOwnProperty('message')) {
            this.alertService.show(event.body.message);
          }
        }
      });
  }
}

