import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Backoffice',
  },

  {
    name: 'Reportes',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Mapas',
    url: '/base/cards',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Administración de vendedores',
    url: '/theme/typography',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' },
  },

  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts',
  },
];
