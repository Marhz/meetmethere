import { Component, OnInit } from '@angular/core';

import { Event } from '../event/event.model';
import { EventService } from '../event/event.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.scss']
})
export class EventsMapComponent implements OnInit {

  private center;
  private events: Event[];
  private mapReady: boolean = false;
  private distance: number;

  constructor(
    private eventService: EventService,
    private location: Location,
    private mapsAPILoader:MapsAPILoader,
  ) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.getEvents();
      });
    }
    this.center = {lat: 48.864716, lng: 2.349014, distance: 150};
    this.getEvents();
  }

  getEvents(): void {
    const coordinates = {lat: this.center.lat, lng: this.center.lng, distance: 150}
    this.eventService.getEventsNear(coordinates)
      .then(events => this.populateMap(events))
  }

  updateCenter(data) {
    this.center = {lat: data.latitude, lng: data.longitude};
    this.getEvents();
  }

  populateMap(events) {
    console.log(events);
    this.events = events;
    // for(let i = 0; i < this.events.length; i++) {
    //   this.events[i].latitude = this.events[i].latitude + i * 0.01
    // }
    // this.mapsAPILoader.load().then(() => {
    //   let bounds = new google.maps.LatLngBounds();
    //   this.events.forEach(event => {
    //     bounds.extend({lat: event.latitude, lng: event.longitude})
    //   });
    // })
      this.mapReady = true;

  }
}
