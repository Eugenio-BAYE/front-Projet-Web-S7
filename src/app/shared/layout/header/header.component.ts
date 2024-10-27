import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NAV_ITEMS, HEADER_ITEMS } from '@constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  navItems = NAV_ITEMS;
  headerItems = HEADER_ITEMS;
  
  isSidebarVisible = false;

  toggleSidebar() {
    console.log('burger cliqué');
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
