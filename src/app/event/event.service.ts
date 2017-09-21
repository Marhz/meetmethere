import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Event } from './event.model';

import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable()

export class EventService {

	private eventsUrl = 'http://meetmethere.dev/api/events';
	private headers = new Headers({'Content-type' : 'application/json'});

	constructor(private http: Http, private httpClient: HttpClient, private authService: AuthService) {}

	getEvents(page: number): Promise<Event[]> {
		return this.httpClient
			.get(`events?page=${page}`)
			.toPromise()
			.then(res => {
        res['data'].data = res['data'].data.map(e => Object.assign(new Event, e))
        // console.log(res['data'].data.map(e => Object.assign(new Event, e)))
        return res['data']
      })
			.catch(this.handleError);
	}

	submitEvent(event: Event): Promise<any> {
    let formData = this.makeFormData(event);
		return this.httpClient
			.post("events", formData)
			.toPromise()
			.then(res => {
				return res;
			})
			.catch(this.handleError);


    // let headers = new HttpHeaders();
    /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // console.log(event);
		// return this.httpClient
		// 	.post("events", event, {headers: headers})
		// 	.toPromise()
		// 	.then(res => {
		// 		return res;
		// 	})
		// 	.catch(this.handleError);
	}

	getEvent(id: number): Promise<Event> {
		return this.httpClient
			.get(`events/${id}`)
			.toPromise()
			.then(res => {
        res['data'].participants = res['data'].participants.map(p => Object.assign(new User(), p));
        return Object.assign(new Event(), res['data'])
      })
			.catch(this.handleError);
	}

	getEventCoordinates(address: string): Promise<any> {
		return this.http.get(`http://maps.google.com/maps/api/geocode/json?address=${address}&sensor=false`)
			.toPromise()
			.then((mapData) => mapData.json().results[0].geometry.location)
			.catch(() => this.handleError("Address not found"));
	}

	getEventForEditing(id: number): Promise<Event> {
		return this.httpClient.get(`events/${id}`)
			.toPromise()
			.then(res => res['data'] as Event)
			// .catch(err => this.handleError);
	}

	updateEvent(event: Event): Promise<any> {
    const formData = this.makeFormData(event);
    formData.append('_method', 'put');
		return this.httpClient
			.post(`events/${event.id}`, formData)
			.toPromise()
			.then(res => res);
	}

  getEventsNear(coords): Promise<Event[]> {
    const url = `${this.eventsUrl}/map?lat=${coords.lat}&lng=${coords.lng}&distance=${coords.distance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json().data);
  }

  private makeFormData(event: Event): FormData {
    let formData:FormData = new FormData();
    for (let key of Object.keys(event)) {
      console.log(key, event[key]);
      if (event[key] !== undefined)
        formData.append(key, event[key]);
    }
    return formData;
    // formData.append('banner', event.banner);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
  }

	private handleError(error: any): Promise<any> {
		// console.error(error);
		return Promise.reject(error.message || error);
	}
}
