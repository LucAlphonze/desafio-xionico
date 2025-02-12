import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme',
    },
    children: [
      {
        path: '',
        redirectTo: 'colors',
        pathMatch: 'full',
      },
      {
        path: 'colors',
        loadComponent: () =>
          import('./reporte-ventas.component').then(
            (m) => m.ReporteVentasComponent
          ),
        data: {
          title: 'Colors',
        },
      },
      {
        path: 'typography',
        loadComponent: () =>
          import('./typography.component').then((m) => m.TypographyComponent),
        data: {
          title: 'Typography',
        },
      },
    ],
  },
];
