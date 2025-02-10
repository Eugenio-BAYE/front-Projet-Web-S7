import { Component, Type } from '@angular/core';
import { ComponentButtonPanelComponent } from 'src/app/shared/components/component-button-panel/component-button-panel.component';
import { SELLER_NAV_ITEMS } from './seller.constants';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    ComponentButtonPanelComponent,
    MatButtonModule
  ],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  NAV_ITEMS = SELLER_NAV_ITEMS;
}
