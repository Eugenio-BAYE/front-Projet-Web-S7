import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  typeUtilisateur: 'admin' | 'manager';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserRole: 'admin' | 'manager' | null = null;

  constructor(
    private apiService: ApiService
  ) {
    this.currentUserRole = 'admin'; // TODO: Replace with actual user role from backend response
    console.log("Current role is " + this.currentUserRole);
  }

  login(email: string, motdepasse: string, userType: 'admin' | 'manager'): Observable<LoginResponse> {
    const endpoint = userType === 'admin' ? 'administrateurs/login' : 'gestionnaires/login';

    return this.apiService.post<LoginResponse>(endpoint, { email, motdepasse }, {responseType: 'text', withCredentials : true}).pipe(
      tap((response) => {
        this.currentUserRole = response?.typeUtilisateur || null;
        console.log("User logged in with role:", this.currentUserRole);
      })
    );
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'admin';
  }

  isManager(): boolean {
    return this.currentUserRole === 'manager';
  }

  getUserRole(): 'admin' | 'manager' | null {
    return this.currentUserRole;
  }
}
