import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NAV_ITEMS, HEADER_ITEMS } from 'src/app/constants';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  navItems = NAV_ITEMS;
  headerItems = HEADER_ITEMS;
  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  isSidebarVisible = false;

  constructor(
    private authService: AuthService,
  ) { }

  toggleSidebar() {
    console.log('burger cliqué');
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        console.log('Connexion status:', loggedIn);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
