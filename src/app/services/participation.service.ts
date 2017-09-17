import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { Event } from '../event/event.model';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ParticipationService {

  private apiUrl = 'http://meetmethere.dev/api/events';
  private headers = new Headers({'Content-type' : 'application/json'});

  constructor(private http: Http, private authService: AuthService, private httpClient: HttpClient) {}

  participate(eventId: number): Promise<any> {
    return this.httpClient
      .post(`events/${eventId}/participate`, JSON.stringify(''))
      .toPromise()
      .then(res => res)
      .catch(this.handleError);

  }

  cancel(eventId: number): Promise<any> {
    return this.httpClient
      .delete(`events/${eventId}/participate/cancel`)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error(error);
    return Promise.reject(error.message || error);
  }
}
