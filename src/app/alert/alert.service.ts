import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class AlertService {

	public isVisible: boolean = false
	public message: string;
	public status: string;
	constructor() {}

	show(message: string, status: string = "is-primary") {
		this.isVisible = true;
		this.message = message;
		this.status = status;
		setTimeout(() => this.isVisible = false, 3000);
	}

	// isVisible() {
	// 	return this.isVisible;
	// }

}