import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Map, MapStyle, Marker, config, geocoding } from '@maptiler/sdk';
import { Popup } from 'maplibre-gl';


@Component({
    selector: 'app-mapa-ventas',
    templateUrl: './mapa-ventas.component.html',
    styleUrls: ['./mapa-ventas.component.scss'],
    standalone:true,
    imports:[HttpClientModule]
})
export class MapaVentasComponent implements OnInit, AfterViewInit {
  map!: Map;
  marker!: Marker;
  markerResults!: string;
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;    
    latitudInicial= -31.4201 
    longitudInicial= -64.1888
    zoomInicial=14
    constructor(private http: HttpClient) { }
    reporteVentasUrl = environment.URL_REPORTE_VENTAS
    apiKeyMaptiler = environment.MAPTILER_API_KEY
    ngOnInit(): void {
        config.apiKey = this.apiKeyMaptiler
    }
    ngAfterViewInit(){
        const initialState = { lng: -64.1888, lat: -31.4201, zoom: 14 };

        this.map = new Map({
          container: this.mapContainer.nativeElement,
          style: MapStyle.STREETS,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        });
        this.marker = new Marker({ color: '#FF0000', draggable: true })
          .setLngLat([-64.1888, -31.4201])
          .addTo(this.map)
            this.http.get<any[]>(`${this.reporteVentasUrl}?fecha_desde=2025-02-01&fecha_hasta=2025-02-12&empresa=1&page_size=50`).subscribe((data:any) => { // Obtén los datos de la API
                data.results.forEach((venta: any) => {  // Usa forEach para iterar
                    venta.ventas_detalle.forEach((detalle: any) => { // Itera sobre ventas_detalle
                        const marker = new Marker({color: '#FF0000'}).setLngLat([venta.long, venta.lat]).setPopup(new Popup()
                        .setHTML(
                            ` <div style="background-color: #f0f0f0; color: #333; padding: 10px;">                   
                            <b>Cliente:</b> ${venta.cliente}<br>
                            <b>Vendedor:</b> ${venta.vendedor}<br>
                            <b>Importe:</b> ${venta.importe}<br>
                            <b>Producto:</b> ${detalle.producto}<br>
                            <b>Cantidad:</b> ${detalle.cantidad}
                                </div>
                        `
                        )).addTo(this.map)
                    });
                });
            });
    }
}