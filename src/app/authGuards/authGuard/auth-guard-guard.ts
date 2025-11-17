import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../../core/common-methods/cookie-helper';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = getCookie("authToken");

  if (token) {
    return true; // allow route
  }

  router.navigate(['/login']);
  return false; // block route

};
