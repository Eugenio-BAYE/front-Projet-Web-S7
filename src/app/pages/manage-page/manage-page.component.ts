import { Component } from '@angular/core';
import { MANAGE_ITEMS } from './manage-page.constants';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-page',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterModule
  ],
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.css'
})
export class ManagePageComponent {
  manageItems = MANAGE_ITEMS;

  getRandomRotation(): number {
    return Math.random() * 4 - 2;
  }

}
