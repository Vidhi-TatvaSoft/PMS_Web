import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../../core/common-methods/cookie-helper';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = getCookie("authToken");

  if (token) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
