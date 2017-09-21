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
  paginationInfos: object;
  eventsReady: boolean = false;
  page: number = 1;

  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents(this.page).then(data => {
      this.paginationInfos = {
        page: data['current_page'],
        nextPage: data['next_page'],
        prevPage: data['prev_page'],
        lastPage: data['last_page']
      }
      this.events = data['data'];
      this.eventsReady = true;
    });
  }

  pageChanged(page: number): void {
    console.log(page);
    this.page = page;
    this.getEvents();
  }

  bannerBackground(event: Event): string {
    return `url("${event.bannerUrl()}") no-repeat center`;
  }
}
