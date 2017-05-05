import {Component} from '@angular/core';
import { Platform} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


/**
 * Generated class for the Maps page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class Maps {
  marker: Marker;
  map: GoogleMap;
  lat: any;
  long: any;

  constructor(private googleMaps: GoogleMaps, public platform: Platform) {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => this.getCurrentLoc());
  }

  getCurrentLoc() {

    this.map.getMyLocation().then(
      (data) => {
        console.log('Success' + JSON.stringify(data));

        this.lat = data.latLng.lat;
        this.long = data.latLng.lng;
        console.log('Success getting location', data);

        // create LatLng object
        let ionic: LatLng = new LatLng(this.lat, this.long);

        // create CameraPosition
        let position: CameraPosition = {
          target: ionic,
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        this.map.moveCamera(position);

        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: 'You are here !'
        };
          // this.map.remove();

        this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
          });
      },
      (err) => console.log('Success' + JSON.stringify(err))
    );
  }

  getClass() {
    return (this.platform.dir() == 'ltr' ? 'right' : 'left');
  }
}
