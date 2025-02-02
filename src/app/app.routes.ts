import { Routes } from '@angular/router';
import { PagetestComponent } from './pages/pagetest/pagetest.component';
import { roleGuard } from './core/guards/role.guard';
import { SellerCreateComponent } from './pages/seller/seller-create/seller-create.component';
import { SellerManageComponent } from './pages/seller/seller-manage/seller-manage.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import { ManagerCreatePageComponent } from './pages/manager/manager-create-page/manager-create-page.component';
import { ManagerManagePageComponent } from './pages/manager/manager-manage-page/manager-manage-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { EditorCreatePageComponent } from './pages/editor/editor-create-page/editor-create-page.component';
import { LicenseCreatePageComponent } from './pages/license/license-create-page/license-create-page.component';
import { GameDepositComponent } from './pages/game/game-deposit/game-deposit.component';
import { SellerComponent } from './pages/seller/seller.component';
import { SessionCreatePageComponent } from './pages/session/session-create-page/session-create.component';
import { StockToSaleComponent } from './pages/game/stock-to-sale/stock-to-sale.component';
import { GameSalePageComponent } from './pages/game/game-sale-page/game-sale-page.component';

export const routes: Routes = [
  // --- Main routes ---
  {
    path: '',
    component: HomePageComponent, // TODO: Create a HomePageComponent
  },
  {
    path: '404',
    component: NotFoundPageComponent,
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
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'manage',
    component: ManagePageComponent,
    canActivate: [roleGuard],
    data: { role: 'manager' },
  },
  {
    path : 'session',
    children: [
      {
        path: 'create',
        canActivate: [roleGuard],
        data: { role: 'gestionnaire' },
        component: SessionCreatePageComponent
      }
    ]
  },
  {
    path: 'manager',
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'create',
        component: ManagerCreatePageComponent
      },
      {
        path: 'manage',
        component: ManagerManagePageComponent
      },
    ],
  },
  {
    path: 'license',
    canActivate: [roleGuard],
    data: { role: 'manager' },
    children: [
      {
        path: 'create',
        component: LicenseCreatePageComponent,
      }
    ]
  },
  {
    path: 'editor',
    canActivate: [roleGuard],
    data: { role: 'manager' },
    children: [
      {
        path: 'create',
        component: EditorCreatePageComponent,
      }
    ]
  },
  {
    path: 'seller',
    canActivate: [roleGuard],
    data: { role: 'manager' },
    children: [
      {
        path: '',
        component: SellerComponent,
      },
      {
        path: 'find',
        component: SellerManageComponent, // TODO: Create a UserPageComponent
      },
      {
        path: 'create',
        component: SellerCreateComponent, // TODO: Create a UserCreateComponent
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
        component: GameDepositComponent
      },
      {
        path: 'stockToSale',
        component: StockToSaleComponent
      },
      {
        path: 'sale',
        component: GameSalePageComponent
      }

    ],
  },
  // --- 404 route ---
  {
    path: '**',
    redirectTo: '/404' // TODO: Create a 404 page
  },
];
