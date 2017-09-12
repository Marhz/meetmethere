import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../event/event.model';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	events: Event[];

  constructor(
  	private router: Router,
  	private eventService : EventService,
  ) { }

  ngOnInit() {
  	this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().then(events => this.events = events);
  }
}
