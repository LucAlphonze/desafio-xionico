import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'administracion',
    },
    children: [
      {
        path: 'reportes',
        loadComponent: () =>
          import('./reporte-ventas.component').then(
            (m) => m.ReporteVentasComponent
          ),
        data: {
          title: 'Reportes',
        },
      },
      {
        path: 'vendedores',
        loadComponent: () =>
          import('./vendedores.component').then((m) => m.VendedoresComponent),
        data: {
          title: 'Vendedores',
        },
      },
    ],
  },
];
