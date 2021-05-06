import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { AppComponentService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  pointName = '';
  mapType = "SATELLITE";

  // default is Tartu location
  location: VenueLocation = {
    name: "tartu",
    position: {
      lat: 58.3779413,
      lng: 26.7316876
    }
  };

  venuePoints: VenuePoint[] = [];
  currentVenuePhotos: VenuePhoto[] = [];

  pointClicked = false;

  constructor(private _service: AppComponentService) {
  }

  ngOnInit() {
    this.getBurgerVenues();
  }

  changeLocation(name: string) {
    switch (name) {
      case 'tartu':
        this.location = {
          name: name,
          position: {
            lat: 58.3779413,
            lng: 26.7316876
          }
        }
        break;
      case 'new-york':
        this.location = {
          name: name,
          position: {
            lat: 40.7345492,
            lng: -74.0007608
          }
        }
        break;
    }

    this.getBurgerVenues();
  }

  getBurgerVenues() {
    this._service.getBurgerVenues(this.location.position).subscribe((resp: any) => {
      console.log('resp: ', resp);
      this.extractVenuePoints(resp.response.venues);
    });
  }


  extractVenuePoints(venues: any) {
    this.venuePoints = [];
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
            color: 'red',
          },
          id: v.id
        }
      );
      this.getRecentPhoto(v);
      console.log(this.venuePoints);
    });
  }

  showName(venue: VenuePoint, marker: any) {
    console.log('selected venue: ', venue);
    this.pointName = venue.name;
    this.infoWindow.open(marker);
  }

  getRecentPhoto(point: VenuePoint) {
    this.currentVenuePhotos = [];
    /*  for (let i = 0; i < 20; i++) {
        this.currentVenuePhotos.push(
          {
            src: 'https://picsum.photos/200/300',
            date: new Date(),
            name: 'Test name'
          }
        );
      }*/

    this._service.getVenuePhotos(point.id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.response.photos.items) {
        let photo = resp.response.photos.items[0]; // since foursquare returns photos by relevance, I assume we are getting newest photo as first entry (timestamps I seen confirms that)
        this.currentVenuePhotos.push(
          {
            src: photo.prefix + photo.width + 'x' + photo.height + photo.suffix,
            date: photo.createdAt,
            name: point.name
          }
        );
      }
    });
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
  id: string;
}

export interface VenuePhoto {
  src: string;
  date: Date;
  name: string;
}

export interface VenueLocation {
  name: string;
  position: {
    lat: number,
    lng: number
  }
}