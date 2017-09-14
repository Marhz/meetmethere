import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import 'rxjs/add/operator/switchMap';

import { Event } from './event.model';
import { EventService } from './event.service';
import { AgmCoreModule } from '@agm/core';
import { AlertService } from "../alert/alert.service";

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	@Input() event: Event;
	private id: number;
	private coords;
	private mapReady = false;
	private showMap = false;
	private addressNotfound = false;

	constructor(
		private eventService: EventService,
		private route: ActivatedRoute,
		private location: Location,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.getEvent();
	}

	getEvent(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
			.subscribe(event => {
				this.event = event;
        this.coords = {lat: event.latitude, lng: event.longitude};
        this.mapReady = true;
        console.log(this.coords);
				//this.getEventCoordinates(event.address);
			});
	}

/*	getEventCoordinates(address: string): void {
		this.eventService.getEventCoordinates(address)
			.then(coordinates => {
        console.log(coordinates);
				this.coords = coordinates;
				this.mapReady = true;
			})
			.catch(err => {
				this.addressNotfound = true;
			});
	}
*/	goBack(): void {
		this.location.back();
	}

	toggleMap(): void {
		this.showMap = !this.showMap;
	}
}
