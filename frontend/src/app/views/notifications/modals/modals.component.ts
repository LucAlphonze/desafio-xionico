import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  RowComponent,
  ThemeDirective,
} from '@coreui/angular';
import { Map, MapStyle, Marker, config, geocoding } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    NgTemplateOutlet,
    ModalToggleDirective,
  ],
})
export class ModalsComponent implements OnInit, AfterViewInit {
  map: Map;
  marker: Marker;
  markerResults: string;
  childViewRef: ViewRef;

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

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
    this.marker = new Marker({ color: '#FF0000', draggable: true })
      .setLngLat([-64.1888, -31.4201])
      .addTo(this.map);
    this.marker.on('dragend', async (e) => {
      const { lng, lat } = e.target._lngLat;
      const results = await geocoding.reverse([lng, lat]);
      this.markerResults = `${results.features[0].text} ${results.features[0].address}`;
      console.log('resultados', results.features[0]);
      // const map: any = e.target;
      // map.getSource('search-results').setData(results);
    });

    // this.map.on('click', async (e) => {

    //   // const bounds: any = results.features.reduce(function (bounds, feature) {
    //   //   return bounds.extend(feature.bbox as unknown as LngLatLike);
    //   // }, new LngLatBounds(results.features[0].bbox as unknown as LngLatLike));
    //   // map.fitBounds(bounds);
    // });
  }

  ngOnDestroy() {}

  handleCreateMap() {}
}
