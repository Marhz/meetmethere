import { Component, OnInit} from '@angular/core';
import { EventService } from '../event/event.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Event } from '../event/event.model';
import { AlertService } from '../alert/alert.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
	selector: 'app-events-form',
	templateUrl: './events-form.component.html',
	styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

	private editing: boolean = false;
	private event: Event = new Event();
	private id: number;
  public latitude: number = 0;
  public longitude: number = 0;
  public address: string;
  public datePickerOption: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    openSelectorOnInputClick: true,
    editableDateField: false,
    inline: false,
  };
  public begin: any;
  public end: any;

	constructor(
		private eventService: EventService,
		private router: Router,
		private route: ActivatedRoute,
		private alertService: AlertService,
		private location: Location,
	) { }

	ngOnInit() {
    const date = new Date();
    // this.baseDate = {date: {year: date.getFullYear, month: date.getMonth, day: date.getDay}}
		this.checkIfEditForm();
	}

	submitEvent(form: NgForm) {
		this.event = form.value;
    this.event.latitude = this.latitude;
    this.event.longitude = this.longitude;
		this.event.id = this.id;
    this.event.address = this.address;
    this.event.begin_at = this.begin;
    this.event.end_at = this.end;
		const met = this.editing ? "updateEvent" : "submitEvent";
		this.eventService[met](this.event)
			.then(res => {
				this.router.navigate([`/events/${res.id}`]);
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

  newAddress(data): void {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.address = data.address;
  }

  onBeginChanged(event: IMyDateModel) {
    this.begin = event.formatted
  }

  onEndChanged(event: IMyDateModel) {
    this.end = event.formatted
  }

}
