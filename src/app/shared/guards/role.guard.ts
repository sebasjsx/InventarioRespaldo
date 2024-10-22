import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const expectedRoles: string[] = route.data['expectedRoles'];

  if (expectedRoles.some((role: string) => authService.hasRole(role))) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
