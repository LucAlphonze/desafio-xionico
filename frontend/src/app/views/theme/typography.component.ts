import { Component } from '@angular/core';
import {
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { ModalsComponent } from '../notifications/modals/modals.component';

@Component({
  templateUrl: 'typography.component.html',
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalsComponent,
  ],
})
export class TypographyComponent {
  constructor() {}
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

  removeFromList(id: number) {
    var nuevaLista = this.listVendedores.filter((item: any) => {
      return item.id !== id;
    });
    this.listVendedores = nuevaLista;
  }
}
