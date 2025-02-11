import { Component, OnInit } from '@angular/core';
import {
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { ModalsComponent } from '../notifications/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  templateUrl: 'typography.component.html',
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [DataService],
})
export class TypographyComponent implements OnInit {
  subscription: Subscription;
  apiVendedores: string = environment.URL_VENDEDORES;
  constructor(public dialog: MatDialog, private dataService: DataService) {}
  ngOnInit(): void {
    this.subscription = this.dataService.listVendedoresInfo.subscribe(
      (message: any) => {
        this.listaVendedores2 = message;
      }
    );
    this.getVendedores();
  }
  listaVendedores2 = [];
  listVendedores = [
    {
      id: 1,
      name: 'vendedor 1',
      email: 'vendedor1@mail.com',
      empresa: 'empresa 1',
      direccion: 'calle falsa 123',
      telefono: 3511234567,
    },
    {
      id: 2,
      name: 'vendedor 2',
      email: 'vendedor2@mail.com',
      empresa: 'empresa 1',
      direccion: 'calle falsa 321',
      telefono: 3517654321,
    },
    {
      id: 3,
      name: 'vendedor 3',
      email: 'vendedor3@mail.com',
      empresa: 'empresa 2',
      direccion: 'calle falsa 456',
      telefono: 3512233445,
    },
    {
      id: 4,
      name: 'vendedor 4',
      email: 'vendedor4@mail.com',
      empresa: 'empresa 2',
      direccion: 'calle falsa 654',
      telefono: 3515544332,
    },
    {
      id: 5,
      name: 'vendedor 5',
      email: 'vendedor5@mail.com',
      empresa: 'empresa 3',
      direccion: 'calle falsa 789',
      telefono: 3516655443,
    },
    {
      id: 6,
      name: 'vendedor 6',
      email: 'vendedor6@mail.com',
      empresa: 'empresa 3',
      direccion: 'calle falsa 987',
      telefono: 3513322445,
    },
  ];

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
  getVendedores() {
    this.dataService.httpGet(this.apiVendedores).subscribe((res: any) => {
      this.dataService.stream_Vendedor_Info(res);
      this.listaVendedores2 = res;
      console.log('Lista de vendedores http: ', res);
    });
  }
}
