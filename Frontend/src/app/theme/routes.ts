import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Listings',
    },
    children: [
      {
        path: 'clients',
        loadComponent: () =>
          import('./colors.component').then((m) => m.ColorsComponent),
        data: {
          title: 'Clients',
        },
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./typography.component').then((m) => m.TypographyComponent),
        data: {
          title: 'Reviews',
        },
      },
    ],
  },
];
