import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Backoffice',
  },

  {
    title: true,
    name: 'Reporte de Ventas',
  },
  {
    name: 'Reportes',
    url: '/administracion/reportes',
    iconComponent: { name: 'cil-description' },
  },
  {
    title: true,
    name: 'Mapas',
  },
  {
    name: 'Mapa de ventas',
    url: '/mapas',
    iconComponent: { name: 'cil-map' },
  },
  {
    title: true,
    name: 'Administracion ',
  },
  {
    name: 'Administración de vendedores',
    url: '/administracion/vendedores',
    iconComponent: { name: 'cil-pencil' },
  },

  {
    url: '/login',
    iconComponent: { name: 'cil-account-logout' },
  },

];
