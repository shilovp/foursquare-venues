import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AppComponentService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mapType = "SATELLITE";

  initialCenter = {
    lat: 58.3779413,
    lng: 26.7316876
  } // tartu bus station

  venuePoints: VenuePoint[] = [];

  constructor(private _service: AppComponentService) {
  }

  ngOnInit() {
    this._service.getBurgerVenues().subscribe((resp: any) => {
      console.log('resp: ', resp);
      this.extractVenuePoints(resp.response.venues);
    });
  }

  extractVenuePoints(venues: any) {
    venues.forEach((v: any) => {
      this.venuePoints.push(
        {
          position: {
            lat: v.location.lat,
            lng: v.location.lng,
          },
          name: v.name,
          label: {
            text: '🍔',
            color: 'green',
          }
        }
      );
      this.initialCenter = this.venuePoints[0].position;
      console.log(this.venuePoints);
    });
  }

  openPoint(point: VenuePoint) {
    console.log(point);
  }
}

export interface VenuePoint {
  position: {
    lat: number,
    lng: number
  };
  name: string;
  label: {
    color: string,
    text: string
  }

}
