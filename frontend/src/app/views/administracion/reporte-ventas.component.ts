import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';

import {
  FormBuilder,
  FormControl,
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
import { ButtonModule, ColComponent, RowComponent } from '@coreui/angular';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import * as XLSX from 'xlsx';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatButtonModule } from '@angular/material/button';


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
    MatProgressSpinnerModule,
    ButtonModule
  ],
  providers: [DataService],
})
export class ReporteVentasComponent implements OnInit, AfterViewInit {
  reporteForm!: FormGroup;
  apiEmpresas: string = environment.URL_EMPRESAS;
  apiReporteVentas: string = environment.URL_REPORTE_VENTAS;
  empresasList: any[] = [
  ]; 
  displayedColumns: string[] = ['fecha', 'empresa', 'vendedor', 'cliente', 'producto', 'cantidad', 'unidad_de_medida']; // Definición de columnas
  renderedData:any
  dataSource!: MatTableDataSource<any>;
  currentDateString: Date = new Date()
  csv:any='';
  csvList:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  page_size = 50;
  loading = false; // Variable para mostrar el indicador de carga
  constructor(private fb: FormBuilder, 
    private dataService: DataService, 
    private dateAdapter: DateAdapter<Date>, 
    private http: HttpClient,
  
  ) {
    this.dateAdapter.setLocale('en-GB')
 
  }

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      fecha_desde: [new FormControl<Date| null>(null), Validators.required],
      fecha_hasta: [new FormControl<Date| null>(null), Validators.required],
      empresa: [[], Validators.required],
      page_size: [
        50,
        [Validators.required, Validators.min(10), Validators.max(100)],
      ],
    });
    this.getEmpresas();
  }

  ngAfterViewInit(): void {}

  // generarReporte() {
  //   if (this.reporteForm.valid) {
  //     this.loading = true; // Muestra el indicador de carga
  //     const filtros = this.reporteForm.value;
     

  //     this.http.get(this.apiReporteVentas, { params })
  //   }
  // }
  
  
  obtenerResultadosDesdeLaBaseDeDatos(filtros: any): any[] {
    // Lógica para construir la consulta SQL y obtener los datos
    // ... (reemplaza con tu implementación)
    console.log('filtros: ', filtros);

   
    return []
  }
  getEmpresas() {
    this.dataService.httpGet(this.apiEmpresas).subscribe((res: any) => {
      // this.dataService.stream_Vendedor_Info(res);
      this.empresasList = res;
      console.log('Lista de empresa http: ', res);
    });
  }
  generarQueryString(): string {
    const params = new URLSearchParams();    
    const fecha_desde = this.reporteForm.value.fecha_desde.toISOString().split('T')
    const fecha_hasta = this.reporteForm.value.fecha_hasta.toISOString().split('T')
    this.reporteForm.value.fecha_desde =fecha_desde[0]
    this.reporteForm.value.fecha_hasta = fecha_hasta[0]
      
  console.log(params)
    for (const key in this.reporteForm.value) {
      const value = this.reporteForm.value[key];
      if (value) { // Solo añade parámetros con valores
        if (Array.isArray(value)) { // Manejo de arrays (para filtros múltiples)
          value.forEach(v => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    }
  
    return params.toString();
  }
  aplicarFiltros() {
    const queryString = this.generarQueryString();
    const url = `${this.apiReporteVentas}?${queryString}`; // Ajusta la URL de tu API
    console.log("url: ",url)
    this.dataService.httpGet(url).subscribe({
      next:(resultados: any) => {
        console.log("reporteVentas: ",resultados.results)
        this.loading = false; // Oculta el indicador de carga
        if (resultados.results.length > 0) {
          this.dataSource = new MatTableDataSource<any>(resultados.results);
          this.dataSource.connect().subscribe(d => this.renderedData = d);
          this.dataSource.paginator = this.paginator;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
          this.dataSource.paginator = this.paginator;
        }
      },
      error:(error) => {
        this.loading = false; // Oculta el indicador de carga en caso de error
        console.error('Error al obtener los datos:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    } // Ajusta la URL de tu API
      
    );
    
    
  }
  // descargarExcel() {
  //   const data = this.dataSource.data; // Obtén los datos de la tabla
  
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
  //   XLSX.writeFile(workbook, 'reporte_ventas.xlsx');
  // }

 
  

  downloadCSV(){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Reporte de Ventas',
      useBom: true,
      noDownload: false,
      headers: this.displayedColumns
    };
    this.renderedData.forEach((e: any) => {  // Usa forEach para iterar
      e.ventas_detalle.forEach((detalle: any) => { // Itera sobre ventas_detalle
          this.csvList.push({ // Añade un nuevo objeto a csvList por cada detalle
              fecha: e.fecha,
              empresa: e.empresa,
              vendedor: e.vendedor,
              cliente: e.cliente,
              producto: detalle.producto, // Accede directamente a detalle.producto
              cantidad: detalle.cantidad, // Accede directamente a detalle.cantidad
              unidad_de_medida: detalle.unidad_de_medida // Accede directamente a detalle.unidad_de_medida
          });
      });
  });
  console.log(this.csvList)
  new ngxCsv(this.csvList,'reporte_ventas',options )

  }
}
