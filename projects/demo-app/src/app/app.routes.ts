import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'component',
    loadComponent: () =>
      import('../../../bvb-lib/src/lib/bvb-lib.component').then(
        (m) => m.BvbLibComponent
      ),
  },
];
