import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from '../../services/auth.service';
import { Comment } from './comment.model';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class CommentService {

	private url = 'http://meetmethere.dev/api/';
	private headers = new Headers({'Content-type' : 'application/json'});

	constructor(private http: Http, private authService: AuthService) {}

	getComments(eventId: number): Promise<Comment[]> {
		return this.http.get(`${this.url}events/${eventId}/comments`)
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	submitComment(content: string, eventId: number) {
		return this.http.post(`${this.url}events/${eventId}/comments?token=${this.authService.getToken()}`, JSON.stringify({content}), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	deleteComment(id: number) {
		return this.http.delete(`${this.url}comments/${id}/delete?token=${this.authService.getToken()}`)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	editComment(content: string, commentId: number) {
		return this.http.put(
				`${this.url}comments/edit?token=${this.authService.getToken()}`,
				JSON.stringify({content, comment_id: commentId}),
				{headers: this.headers}
			)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError)
	}

	loggedIn() {
		return this.authService.isLoggedIn();
	}

	private handleError(error: any): Promise<any> {
		console.error(error);
		return Promise.reject(error.message || error);
	}

}
