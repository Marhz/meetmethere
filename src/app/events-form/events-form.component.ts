import { AddressInputComponent } from './../address-input/address-input.component';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  public address: string = '';
  public datePickerOption: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    openSelectorOnInputClick: true,
    editableDateField: false,
  };
  public begin: any;
  public end: any;
  public test: string = "";
  private file : File;

	constructor(
		private eventService: EventService,
		private router: Router,
		private route: ActivatedRoute,
		private alertService: AlertService,
		private location: Location,
	) { }

	ngOnInit() {
    const date = new Date();
    this.datePickerOption.disableUntil = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    this.begin = {date: {year: date.getFullYear() + 1, month: date.getMonth(), day: date.getDay()}};
    this.end = {date: {year: date.getFullYear() + 1, month: date.getMonth(), day: date.getDay()}};
    this.checkIfEditForm();
	}

	submitEvent(form: NgForm) {
		this.event = form.value;
    this.event.latitude = this.latitude;
    this.event.longitude = this.longitude;
		this.event.id = this.id;
    this.event.address = this.address;
    this.event.begin_at = this.transformDate(this.begin.date);
    this.event.end_at = this.transformDate(this.end.date);
    this.event.banner = this.file;
    console.log(this.event);

    const met = this.editing ? "updateEvent" : "submitEvent";
		this.eventService[met](this.event)
			.then(res => {
				// this.router.navigate([`/events/${res.id}`]);
			})
			.catch(err => console.log(err));
	};

	checkIfEditForm() {
		this.route.params
			.subscribe((params) => {
				if(params.hasOwnProperty('id')) {
					this.id = +params.id;
					this.eventService.getEventForEditing(+params.id)
						.then(event => this.prepareEditedEvent(event))
						.catch(err => {
							this.alertService.show(err.message, "is-danger");
							// this.location.replaceState("/");
							// this.router.navigate(['/']);
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

  private prepareEditedEvent(event: Event): void {
    this.event = event;
    this.address = event.address;
    this.latitude = event.latitude;
    this.longitude = event.longitude;
    this.begin = { date: this.stringToDate(event.begin_at) };
    this.end = { date: this.stringToDate(event.end_at) };
  }

  private transformDate(date): string {
    return date.year+'-'+date.month+'-'+date.day;
  }

  private stringToDate(date: string) {
    const arr = date.split('-');
    return { year: +arr[0], month: +arr[1], day: +arr[2].split(' ')[0] };
  }

  fileChange(event) {
    this.file = event.target.files[0];
  }
}
