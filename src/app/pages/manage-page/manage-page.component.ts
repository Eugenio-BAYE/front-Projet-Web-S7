import { Component } from '@angular/core';
import { MANAGE_ITEMS } from './manage-page.constants';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-manage-page',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.css'
})
export class ManagePageComponent {
  manageItems = MANAGE_ITEMS;

}
