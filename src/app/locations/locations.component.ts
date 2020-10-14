import { Component, OnInit } from '@angular/core';
import { Place } from '../models/Place';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  // For longitude west, give in negative, for East, give in positive number.
  lat = 40.7127753;
  lng = -74.0059728;
  // loading: Boolean = true;

  neighbourhoodPlaces: Array<Place> = [];
  constructor() {
    this.neighbourhoodPlaces = new Array<Place>();
  }

  ngOnInit(): void {
    this.fetchNeighbourhood();
  }

  fetchNeighbourhood = () => {
    let map;
    let neighbourhoodService;
    const loc = new google.maps.LatLng(this.lat, this.lng);

    map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    });

    const neighbourhoodRequest = {
      location: loc,
      radius: '1500',
      type: ['neighborhood', 'art_gallery', 'museum', 'zoo']
    };

    neighbourhoodService = new google.maps.places.PlacesService(map);
    neighbourhoodService.nearbySearch(neighbourhoodRequest, (this.neighbourhoodCallback).bind(this));
  }
  neighbourhoodCallback = (results, status) => {
    let count = 0;
    results.forEach(element => {
      if (element.photos && count < 8) {
        count++;
        const newDest: Place = {
          placeName: element.name,
          placePhoto: (element.photos) ? element.photos[0].getUrl() : undefined
        };
        this.neighbourhoodPlaces.push(newDest);
      }
    });
  }
}
