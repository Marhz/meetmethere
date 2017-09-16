import { Injectable, Output, EventEmitter } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpRequest, HttpClient } from '@angular/common/http';
// import { HttpClient } from "@angular/common/http";
import { User } from "../user";
import 'rxjs/add/operator/map';
import { AlertService } from '../alert/alert.service';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import 'rxjs/add/operator/do';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

	@Output() loggedInEvent = new EventEmitter();
	private eventsUrl: string = "http://meetmethere.dev/api/";
	private user: User;
	// private headers = new Headers({'Content-type' : 'application/json'});
	private headers: Headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});

	constructor(private http: Http, private alertService: AlertService) {}

	signup(name: string, email: string, password: string, password_confirmation: string): Promise<any> {
		return this.http
			.post(`${this.eventsUrl}/register`, { name, email, password, password_confirmation }, { headers: this.headers })
			.toPromise()
			.then(res => res.json())
			.catch(err => console.log(err))
	}

	signin(email: string, password: string): Promise<any> {
		return this.http
		.post(`${this.eventsUrl}/login`, { email, password }, { headers: this.headers })
		.toPromise()
		.then(res => {
      console.log(res);
			const token = res.json().token;
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
      localStorage.setItem('token', token);
			localStorage.setItem('auth', JSON.stringify(res.json().user));
			this.loggedInEvent.emit("loggedIn")
			return { token, decoded: JSON.parse(window.atob(base64)) };
		})
		.catch(this.handleError);
	}

	getUser() {
    if (localStorage.getItem('auth') === null) return;
		if (this.user === undefined) {
			const user = JSON.parse(localStorage.getItem('auth'));
			this.user = new User(
				user.id,
				user.name,
				user.email,
				user.avatar,
				user.created_at,
				user.updated_at,
			);
		}
		return this.user;
	}

  refreshToken(): Promise<any> {
    return this.http
      .get(`http://meetmethere.dev/api/refreshToken?token=${this.getToken()}`)
      .toPromise()
      .then((res) => {
        localStorage.setItem('token', res.json().token);
      }).catch(err => {
        this.alertService.show("Your token has expired, please log in again", "is-warning");
        this.signOut();
       });

  }

	isLoggedIn(): boolean {
		return (localStorage.getItem('token') !== null);
	}

	getToken(): string {
		return localStorage.getItem('token');
	}

	signOut(): void {
    localStorage.removeItem('token');
		localStorage.removeItem('auth');
	}
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.json().error || error);
	}
}
