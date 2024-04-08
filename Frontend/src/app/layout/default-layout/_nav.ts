import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Listings',
  },
  {
    name: 'Clients',
    url: '/listings/clients',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Orders',
    url: '/listings/reviews',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-basket' },
  },
];
