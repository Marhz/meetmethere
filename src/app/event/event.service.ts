import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Event } from './event.model';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class EventService {

	private eventsUrl = 'http://meetmethere.dev/api/events';
	private headers = new Headers({'Content-type' : 'application/json'});

	constructor(private http: Http, private httpClient: HttpClient, private authService: AuthService) {}

	getEvents(): Promise<Event[]> {
		return this.httpClient
			.get("events")
			.toPromise()
			.then(res => res as Event[])
			.catch(this.handleError);
	}

	submitEvent(event: Event): Promise<any> {
		return this.httpClient
			.post("events", event)
			.toPromise()
			.then(res => {
				return res;
			})
			.catch(this.handleError);
	}

	getEvent(id: number): Promise<Event> {
		return this.http
			.get(`${this.eventsUrl}/${id}`)
			.toPromise()
			.then(res => res.json().data as Event)
			.catch(this.handleError);
	}

	getEventCoordinates(address: string): Promise<any> {
		return this.http.get(`http://maps.google.com/maps/api/geocode/json?address=${address}&sensor=false`)
			.toPromise()
			.then((mapData) => mapData.json().results[0].geometry.location)
			.catch(() => this.handleError("Address not found"));
	}

	getEventForEditing(id: number): Promise<Event> {
		return this.http.get(this.eventsUrl+"/"+id+"/edit?token="+this.authService.getToken())
			.toPromise()
			.then(res => res.json().data as Event)
			// .catch(err => this.handleError);
	}

	updateEvent(event: Event): Promise<any> {
		return this.http
			.put(`${this.eventsUrl}/${event.id}?token=${this.authService.getToken()}`, JSON.stringify(event), {headers: this.headers})
			.toPromise()
			.then(res => res.json());
	}

  getEventsNear(coords): Promise<Event[]> {
    const url = `${this.eventsUrl}/map?lat=${coords.lat}&lng=${coords.lng}&distance=${coords.distance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json().data);
  }

	private handleError(error: any): Promise<any> {
		// console.error(error);
		return Promise.reject(error.message || error);
	}
}
