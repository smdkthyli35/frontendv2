import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (authService.isAuthenticated()) {
    return true;
  }
  else {
    router.navigate(['/login']);
    toastrService.error("You must log in to view this page!", "Error");
    return false;
  }
};