import { Injectable, Output, EventEmitter } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { User } from "../user";


import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

	@Output() loggedInEvent = new EventEmitter();
	private eventsUrl: string = "http://meetmethere.dev/api/";
	private user: User;
	// private headers = new Headers({'Content-type' : 'application/json'});
	private headers: Headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});

	constructor(private http: Http) {}

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
			const token = res.json().token;
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			localStorage.setItem('token', token);
			localStorage.setItem('auth', JSON.stringify(res.json().user));
			this.loggedInEvent.emit("loggedIn")
			return { token, decoded: JSON.parse(window.atob(base64)) };
			}
		)
		.catch(err => console.log(err))			
	}

	getUser(): User{
		if (this.user === undefined) {
			this.user = JSON.parse(localStorage.getItem('auth'));
			this.user = new User(
				this.user.id,
				this.user.name,
				this.user.email,
				this.user.avatar,
				this.user.created_at,
				this.user.updated_at,
			);
		}
		return this.user;
	}

	isLoggedIn(): boolean {
		return (localStorage.getItem('token') !== null);
	}

	getToken(): string {
		return localStorage.getItem('token');
	}

	signOut(): Promise<any> {
		const token = this.getToken();
		localStorage.removeItem('token');
		return this.http.get(this.eventsUrl+"logout/?token="+token)
			.toPromise()
			.then((res) => {
				return res.json()
			})
			.catch(this.handleError);

	}
	private handleError(error: any): Promise<any> {
		console.error(error);
		return Promise.reject(error.message || error);
	}
}