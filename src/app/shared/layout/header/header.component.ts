import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSidebarVisible = false;

  toggleSidebar() {
    console.log('burger cliqué');
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
