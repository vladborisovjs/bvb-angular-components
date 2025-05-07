import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/components/overview',
    pathMatch: 'full',
  },
  {
    path: 'components/overview',
    loadComponent: () =>
      import('./pages/overview/overview.component').then(
        (c) => c.OverviewComponent
      ),
  },
  {
    path: 'components/tooltip',
    loadComponent: () =>
      import('../app/examples/tooltip/tooltip.component').then(
        (c) => c.TooltipComponent
      ),
  },
];
