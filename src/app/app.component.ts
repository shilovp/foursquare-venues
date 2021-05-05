import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mapType = "SATELLITE";

  initialCenter = {
    lat: 28.704060,
    lng: 77.102493
  }

  constructor() { }
}
