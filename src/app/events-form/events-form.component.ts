import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Event } from '../event/event.model';
import { AlertService } from '../alert/alert.service';

@Component({
	selector: 'app-events-form',
	templateUrl: './events-form.component.html',
	styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

	private editing: boolean = false;
	private event: Event = new Event(	);
	private id: number;
	
	constructor(
		private eventService: EventService, 
		private router: Router, 
		private route: ActivatedRoute,
		private alertService: AlertService,
		private location: Location,
	) { }

	ngOnInit() {
		this.checkIfEditForm()
	}

	submitEvent(form: NgForm) {
		this.event = form.value;
		this.event.id = this.id;
		const met = this.editing ? "updateEvent" : "submitEvent";
		this.eventService[met](this.event)
			.then(res => {
				this.alertService.show(res.message);
				this.router.navigate([`/events/${res.data.id}`]);
			})
			.catch(err => console.log(err));
	};

	checkIfEditForm() {
		this.route.params
			.subscribe((params) => {
				if(params.hasOwnProperty('id')) {
					this.id = +params.id;
					this.eventService.getEventForEditing(+params.id)
						.then(event => this.event = event)
						.catch(err => {
							this.alertService.show(err.json().message, "is-danger");
							this.location.replaceState("/");
							this.router.navigate(['/']);
						});
					this.editing = true;
				}
				else 
					this.editing = false;
			});
	}
}