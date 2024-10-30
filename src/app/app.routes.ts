import { Routes } from '@angular/router';
import { PagetestComponent } from './pages/pagetest/pagetest.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'pagetest',
    component: PagetestComponent,
    canActivate: [roleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: '', redirectTo: '/',
    pathMatch: 'full'
  }, 
  {
    path: '**',
    redirectTo: '/404' // TODO: Create a 404 page
  },
];
