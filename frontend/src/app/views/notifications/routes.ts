import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: 'modal',
        loadComponent: () => import('./modals/modals.component').then(m => m.ModalsComponent),
        data: {
          title: 'Modal'
        }
      },
    ]
  }
];
