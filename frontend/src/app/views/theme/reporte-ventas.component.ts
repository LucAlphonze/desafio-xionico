import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ColComponent, RowComponent } from '@coreui/angular';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss'],
  standalone: true,
  imports: [
    MatPaginator,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ColComponent,
    RowComponent,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  providers: [DataService],
})
export class ReporteVentasComponent implements OnInit, AfterViewInit {
  reporteForm!: FormGroup;
  apiEmpresas: string = environment.URL_EMPRESAS;
  empresas: any[] = [
    /* Datos de empresas */
  ]; // Reemplaza con tus datos
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  registrosPorPagina = 50;
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      fechaDesde: ['', Validators.required],
      fechaHasta: ['', Validators.required],
      empresas: [[], Validators.required],
      registrosPorPagina: [
        50,
        [Validators.required, Validators.min(10), Validators.max(100)],
      ],
    });
    this.getEmpresas();
  }

  ngAfterViewInit(): void {}

  generarReporte() {
    if (this.reporteForm.valid) {
      const filtros = this.reporteForm.value;
      // Aquí realizarías la consulta SQL a tu base de datos
      // y obtendrías los resultados.
      const resultados = this.obtenerResultadosDesdeLaBaseDeDatos(filtros);

      if (resultados.length > 0) {
        this.displayedColumns = Object.keys(resultados[0]);
        this.dataSource = new MatTableDataSource<any>(resultados);
        this.dataSource.paginator = this.paginator;
      } else {
        // Mostrar mensaje "Sin registros"
        this.dataSource = new MatTableDataSource<any>([]);
        this.dataSource.paginator = this.paginator;
      }
    }
  }
  obtenerResultadosDesdeLaBaseDeDatos(filtros: any): any[] {
    // Lógica para construir la consulta SQL y obtener los datos
    // ... (reemplaza con tu implementación)
    console.log('filtros: ', filtros);
    return []; // Datos de ejemplo
  }
  getEmpresas() {
    this.dataService.httpGet(this.apiEmpresas).subscribe((res: any) => {
      // this.dataService.stream_Vendedor_Info(res);
      this.empresas = res;
      console.log('Lista de empresa http: ', res);
    });
  }
}
