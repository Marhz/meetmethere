import { Component, OnInit, ElementRef, NgZone } from '@angular/core';

import { Event } from '../event/event.model';
import { EventService } from '../event/event.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Location } from '@angular/common'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.scss']
})
export class EventsMapComponent implements OnInit {

  private center;
  private events: Event[];
  private mapReady = false;
  private bounds;
  private latitude;
  private longitude;
  private loc;
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(
    private eventService: EventService,
    private location: Location,
    private mapsAPILoader:MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.center = {lat: 48, lng: 2, distance: 150};
    this.getEvents();
  }

  getEvents(): void {
    const coordinates = {lat: this.center.lat, lng: this.center.lng, distance: 150}
    this.eventService.getEventsNear(coordinates)
      .then(events => {
        this.events = events;
        for(let i = 0; i < this.events.length; i++) {
          this.events[i].latitude = this.events[i].latitude + i * 0.01
        }
        console.log(this.events);
        this.mapsAPILoader.load().then(() => {
          let bounds = new google.maps.LatLngBounds();
          this.events.forEach(event => {
            bounds.extend({lat: event.latitude, lng: event.longitude})
          });
          this.bounds = bounds;
          this.mapReady = true;
        })
      })
    this.searchControl = new FormControl();
  }

  updateCenter(data) {
    this.center = {lat: data.latitude, lng: data.longitude};
    console.log(this.center);
    this.getEvents();
  }
}
