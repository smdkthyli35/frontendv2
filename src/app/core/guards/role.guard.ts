import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const expectedRoles = route.data['roles'];

  if (!authService.isAuthenticated() || !authService.hasRole(expectedRoles)) {
    router.navigate(['/']);
    toastrService.error("Access Denied: You do not have permission to access this page.", "Error");
    return false;
  }

  return true;
};