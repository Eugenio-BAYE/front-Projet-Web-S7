import { SellerCreateComponent } from './seller-create/seller-create.component';
import { SellerManageComponent } from './seller-manage/seller-manage.component';
import { ComponentNavItem } from 'src/app/models/components-nav';

export const SELLER_NAV_ITEMS: ComponentNavItem[] = [
  {
    label: 'Create',
    component: SellerCreateComponent,
  },
  {
    label: 'Manage',
    component: SellerManageComponent,
  },
];
