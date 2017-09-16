import { Http, RequestOptionsArgs, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttp extends Http {

  private baseUrl: string;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
    this.baseUrl = 'http://192.123.24.2:8080';
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('request...');
    return super.request(this.baseUrl + url, options).catch(res => {
      // do something
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('get...');
    return super.get(this.baseUrl + url, options).catch(res => {
      // do something
    });
  }
}
