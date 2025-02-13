import { Component, OnInit } from '@angular/core';
import {
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  ButtonModule,
  CardModule,
} from '@coreui/angular';
import { ModalsComponent } from '../notifications/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  templateUrl: 'vendedores.component.html',
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatIconModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [DataService],
})
export class VendedoresComponent implements OnInit {
  subscription: Subscription;
  apiVendedores: string = environment.URL_VENDEDORES;
  listaVendedores2:any = [];
  constructor(public dialog: MatDialog, private dataService: DataService) {}
  ngOnInit(): void {
    this.subscription = this.dataService.listVendedoresInfo.subscribe((message) => {
        this.listaVendedores2 = message;
        console.log(message)
      }
    );
    this.dataService.getVendedores();
  }
 

  deleteVendedor(id: number) {
    // to do: añadir dialogo de confirmacion antes de borrar
    var nuevaLista = this.listaVendedores2.filter((item: any) => {
      return item.id !== id;
    });
    this.dataService.DeleteVendedor(id).subscribe((res) => {
      console.log('delete vendedor:', res);
    });
    this.listaVendedores2 = nuevaLista;
  }
  openMapDialog(elemento?: any): void {
    if (elemento) {
      const dialogRef = this.dialog.open(ModalsComponent, {
        data: elemento,
      });
    } else {
      const dialogRef = this.dialog.open(ModalsComponent, {
        data: {
          name: '',
          email: '',
          empresa: '',
          direccion: '',
          telefono: '',
        },
      });
    }
  }
 
}
