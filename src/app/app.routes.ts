import { Routes } from '@angular/router';
import { PagetestComponent } from './pages/pagetest/pagetest.component';
import { roleGuard } from './core/guards/role.guard';
import { SellerCreatePageComponent } from './pages/seller/seller-create-page/seller-create-page.component';
import { SellerPageComponent } from './pages/seller/seller-page/seller-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GameDepositPageComponent } from './pages/game/game-deposit-page/game-deposit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  // --- Main routes ---
  {
    path: '',
    component: HomePageComponent, // TODO: Create a HomePageComponent
  },
  {
    path: '404',
    component: PagetestComponent, // TODO: Create a 404 page
  },
  // --- Test routes ---
  {
    path: 'pagetest',
    component: PagetestComponent,
  },
  // --- App routes ---
  // Manage roles with the roleGuard :
  // canActivate: [roleGuard],
  // data: { role: 'admin' | 'manager' }
  {
    path:'login',
    component: LoginPageComponent,
  },
  {
    path: 'seller',
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        component: SellerPageComponent, // TODO: Create a UserPageComponent
      },
      {
        path: 'create',
        component: SellerCreatePageComponent, // TODO: Create a UserCreateComponent
        canActivate: [roleGuard],
        data: { role: 'admin' },
      },
      {
        path: 'view',
        component: PagetestComponent, // TODO: Create a UserPageComponent
        canActivate: [roleGuard],
        data: { role: 'manager' },
      },
    ],
  },
  {
    path: 'game',
    canActivate: [roleGuard],
    data: { role: 'manager' },
    children: [
      {
        path: 'deposit',
        component: GameDepositPageComponent
      },
    ],
  },
  // --- 404 route ---
  {
    path: '**',
    redirectTo: '/404' // TODO: Create a 404 page
  },
];
