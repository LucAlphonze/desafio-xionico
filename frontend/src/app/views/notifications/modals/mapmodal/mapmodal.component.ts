import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  Map,
  MapStyle,
  Marker,
  config,
  geocoding,
  LngLatBounds,
  LngLatLike,
} from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './mapmodal.component.html',
  styleUrls: ['./mapmodal.component.scss'],
  standalone: true,
})
export class MapmodalComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map;
  marker: Marker;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = environment.MAPTILER_API_KEY;
  }

  ngAfterViewInit() {
    const initialState = { lng: -64.1888, lat: -31.4201, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
    this.map.on('load', () => {
      this!.map.addSource('search-results', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      this!.map.addLayer({
        id: 'point-result',
        type: 'circle',
        source: 'search-results',
        paint: {
          'circle-radius': 8,
          'circle-color': '#B42222',
          'circle-opacity': 0.5,
        },
        filter: ['==', '$type', 'Point'],
      });
    });
    // this.map.on('click', async (e) => {

    //   // const bounds: any = results.features.reduce(function (bounds, feature) {
    //   //   return bounds.extend(feature.bbox as unknown as LngLatLike);
    //   // }, new LngLatBounds(results.features[0].bbox as unknown as LngLatLike));
    //   // map.fitBounds(bounds);
    // });
    new Marker({ color: '#FF0000', draggable: true })
      .setLngLat([-64.1888, -31.4201])
      .addTo(this.map)
      .on('drag', async (e) => {
        // console.log('e', e.target._lngLat);
        const { lng, lat } = e.target._lngLat;
        const results = await geocoding.reverse([lng, lat]);

        console.log('resultados', results.features[0]);
        // const map: any = e.target;
        // map.getSource('search-results').setData(results);
      });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
