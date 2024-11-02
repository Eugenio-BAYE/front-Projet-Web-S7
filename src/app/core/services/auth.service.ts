import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  typeUtilisateur: 'admin' | 'manager';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // TODO: Check if thoses are stored when refreshing page. If not use local storage
  private currentUserRole: 'admin' | 'manager' | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;

  constructor(
    private apiService: ApiService
  ) {
    this.checkStoredExpiration();
    this.currentUserRole = 'admin'; // TODO: Replace with actual user role from backend response
    console.log("Current role is " + this.currentUserRole); // TODO: Remove this line in production
  }

  /**
 * Logs in the user and updates the login status if successful.
 *
 * @param {string} email - The user's email.
 * @param {string} motdepasse - The user's password.
 * @param {'admin' | 'manager'} userType - The type of user logging in.
 * @returns {Observable<LoginResponse>} An observable of the login response.
 */
  login(email: string, motdepasse: string, userType: 'admin' | 'manager'): Observable<LoginResponse> {
    const endpoint = userType === 'admin' ? 'administrateurs/login' : 'gestionnaires/login';
    return this.apiService.post<LoginResponse>(endpoint, { email, motdepasse }, { responseType: 'text', withCredentials: true }).pipe(
      tap((response) => {
        this.currentUserRole = response?.typeUtilisateur || null;
        this.isLoggedInSubject.next(true);
        console.log("User logged in with role:", this.currentUserRole); // TODO: Remove this line in production
        const expirationTime = Date.now() + 15 * 60 * 1000; // 15 minutes from now
        localStorage.setItem('tokenExpiration', expirationTime.toString());

        this.isLoggedInSubject.next(true);
        this.startLogoutTimer(15 * 60 * 1000);
      })
    );
  }

  /**
  * Logs out the user, clears the expiration timer, and removes stored expiration.
  */
  logout() {
    this.isLoggedInSubject.next(false);
    this.clearStoredExpiration();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    console.log('User logged out');
  }

  /**
   * Clears the stored token expiration information.
   */
  private clearStoredExpiration() {
    localStorage.removeItem('tokenExpiration');
  }

  /**
   * Returns an observable indicating the login status.
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
 * Checks localStorage for an existing token expiration and starts the timer if valid.
 */
  private checkStoredExpiration() {
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration) {
      const remainingTime = +expiration - Date.now();
      if (remainingTime > 0) {
        this.isLoggedInSubject.next(true);
        this.startLogoutTimer(remainingTime);
      } else {
        this.clearStoredExpiration(); // Token expired, clear storage
        this.isLoggedInSubject.next(false);
      }
    }
  }

  /**
* Starts a timer to automatically log out when the token expires.
* @param duration Duration in milliseconds until the token expires.
*/
  private startLogoutTimer(duration: number) {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(); // Automatically log out when the timer expires
    }, duration);
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
