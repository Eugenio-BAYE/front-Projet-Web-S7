import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Read the required role from the route data
  const requiredRole = route.data['role'] as 'admin' | 'manager';

  if (
    (requiredRole === 'admin' && authService.isAdmin()) ||
    (requiredRole === 'manager' && authService.isManager())
  ) {
    return true;
  }

  router.navigate(['/']); // TODO: Redirect to a 403 page and create a 403 page
  return false;
};
