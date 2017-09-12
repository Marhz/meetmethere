import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { AlertService } from '../alert/alert.service';

@Component({
	selector: 'app-signout',
	template: '',
})
export class SignoutComponent implements OnInit {

	constructor(
		private authService: AuthService, 
		private router: Router, 
		private location: Location,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.signOut();
	}

	signOut() {
		this.authService.signOut()
			.then((res) => {
				console.log(res);
				this.alertService.show(res.message);
			});
			this.location.replaceState("/");
			this.router.navigate(['/']);
	}
}
