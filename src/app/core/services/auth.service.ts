import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRole: 'admin' | 'manager' | null = null;

  constructor() {
    this.currentUserRole = 'admin'; // TODO: Replace with actual user role from backend response
    console.log("Current role is " + this.currentUserRole);
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'admin';
  }

  isManager(): boolean {
    return this.currentUserRole === 'manager';
  }
}
