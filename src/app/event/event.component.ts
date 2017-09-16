import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import 'rxjs/add/operator/switchMap';

import { Event } from './event.model';
import { EventService } from './event.service';
import { AuthService } from '../services/auth.service';
import { ParticipationService } from '../services/participation.service';
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
	private hideMap = true;
	private addressNotfound = false;

	constructor(
    private eventService: EventService,
    private participationService: ParticipationService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private location: Location,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.getEvent();
    // setTimeout(() => this.hideMap = true, 3000);
  }

	getEvent(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
			.subscribe(event => {
				this.event = event;
        this.coords = {lat: event.latitude, lng: event.longitude};
        this.mapReady = true;
    console.log(this.event);

				//this.getEventCoordinates(event.address);
			}, err => console.log("..."));
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
		this.hideMap = !this.hideMap;
    console.log(this.hideMap);
	}

  participate(): void {
    this.participationService.participate(this.event.id)
      .then(res => {
        this.event.participants.push(this.authService.getUser());
      });
  }

  cancelParticipation(): void {
    this.participationService.cancel(this.event.id)
      .then(res => {
        this.event.participants = this.event.participants.filter(user => user.id !== this.authService.getUser().id);
      })
  }

  isParticipating(): boolean {
    return this.event.participants.filter(user => user.id == this.authService.getUser().id).length > 0
  }
}
