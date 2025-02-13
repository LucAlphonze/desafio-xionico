import { Routes } from '@angular/router';

// import { ChartsComponent } from './charts.component';
import { MapaVentasComponent } from './mapa-ventas.component';

export const routes: Routes = [
  {
    path: '',
    component: MapaVentasComponent,
    data: {
      title: 'Mapas'
    }
  }
];
