import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Map, MapStyle, Marker, config, geocoding } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../environments/environment';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgTemplateOutlet } from '@angular/common';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    CardComponent,
    CardBodyComponent,
    ColComponent,
    RowComponent,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [DataService],
})
export class ModalsComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalsComponent>,
    private builder: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.builder.group({
      name: this.builder.control(data.name, Validators.required),
      email: this.builder.control(data.email, [
        Validators.required,
        Validators.email,
      ]),
      empresa: this.builder.control(data.empresa, Validators.required),
      direccion: this.builder.control(data.direccion, Validators.required),
      telefono: this.builder.control(data.telefono, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  map!: Map;
  marker!: Marker;
  markerResults!: string;
  apiVendedor: string = environment.URL_VENDEDORES;
  apiEmpresas: string = environment.URL_EMPRESAS;
  empresasList = [];
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = environment.MAPTILER_API_KEY;
    this.getEmpresas();
  }

  ngAfterViewInit() {
    console.log('data:', this.data);

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
      this.userForm.value.direccion = this.markerResults;
      this.data.direccion = this.markerResults;
      // const map: any = e.target;
      // map.getSource('search-results').setData(results);
    });
  }

  ngOnDestroy() {}

  editarInfo(id?: number): void {
    if (id) {
      this.data.name = this.userForm.value.name;
      this.data.empresa = this.userForm.value.empresa;
      this.data.email = this.userForm.value.email;
      this.data.telefono = this.userForm.value.telefono;
      this.data.direccion = this.userForm.value.direccion;
      this.dataService
        .UpdateVendedor(id, this.userForm.value)
        .subscribe((res) => {
          console.log('vendedor actualizado: ', this.userForm.value);
          console.log('http res: ', res);
          this.dataService.getVendedores();
          location.reload();
        });

      this.dialogRef.close();
    } else {
      this.dataService
        .httpPost(this.apiVendedor, this.userForm.value)
        .subscribe((res) => {
          console.log('vendedor creado: ', this.userForm.value);
          console.log('http res: ', res);
          this.dataService.getVendedores();
          location.reload();
        });
      this.dialogRef.close();
    }
  }

  getEmpresas() {
    this.dataService.httpGet(this.apiEmpresas).subscribe((res: any) => {
      // this.dataService.stream_Vendedor_Info(res);
      this.empresasList = res;
      console.log('Lista de empresa http: ', res);
    });
  }
}
