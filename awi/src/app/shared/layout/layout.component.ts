import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isSidebarVisible = false;

  toggleSidebar() {
    console.log('burger cliqué');
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
