import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { Event } from '../event/event.model';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ParticipationService {

  private apiUrl = 'http://meetmethere.dev/api/events';
  private headers = new Headers({'Content-type' : 'application/json'});

  constructor(private http: Http, private authService: AuthService) {}

  participate(eventId: number): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/${eventId}/participate?token=${this.authService.getToken()}`, JSON.stringify(''), {headers: this.headers})
      .toPromise()
      .then(res => res)
      .catch(this.handleError);

  }

  cancel(eventId: number): Promise<any> {
    return this.http
      .delete(`${this.apiUrl}/${eventId}/participate/cancel?token=${this.authService.getToken()}`)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error(error);
    return Promise.reject(error.message || error);
  }
}
