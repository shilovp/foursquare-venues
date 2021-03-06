import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  CATEGORY_ID = '4bf58dd8d48988d16c941735';
  foursquareVenuesURL = 'https://api.foursquare.com/v2/venues/search';
  foursquarePhotosURL = 'https://api.foursquare.com/v2/venues/';

  client_id = 'JOHDLLJ0YJMSMAS4CMIMKM2M05J1WTEU2BL2TBYZ3HMDXDCR';
  client_secret = 'POKAITH5RQG12OV1L0HROQFKLUZZHLRUJMGHUHUHVEJGQDHV';

  version = '20200505';
  radius = "1000"; // meters

  constructor(private _http: HttpClient) { }

  getBurgerVenues(position: any) {
    return this._http.get(this.foursquareVenuesURL, {
      params: {
        client_id: this.client_id, client_secret: this.client_secret,
        ll: position.lat + ',' + position.lng, v: this.version, categoryId: this.CATEGORY_ID, radius: this.radius
      }
    });
  }

  getVenuePhotos(id: any) {
    return this._http.get(this.foursquarePhotosURL + id + '/photos', {
      params: {
        client_id: this.client_id, client_secret: this.client_secret, v: this.version
      }
    });
  }
}
