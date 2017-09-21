import { Component, OnInit, NgZone, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  @Input() label: string = "";
  @Input() defaultValue: string = "";

  public formControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef
  @Output() newAddress = new EventEmitter<object>();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.formControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const el = this.searchElementRef.nativeElement;
      let autocomplete = new google.maps.places.Autocomplete(el);
      autocomplete.addListener("place_changed", (e) => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.newAddress.emit({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: place.formatted_address
          });
        });
      });
    });
  }
  cancelSubmit(e: KeyboardEvent): void {
    if (e.keyCode == 13)
      e.preventDefault();
  }

  labelPresent(): boolean {
    return this.label.length > 0;
  }
}
