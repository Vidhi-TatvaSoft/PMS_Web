import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../../core/common-methods/cookie-helper';
import {jwtDecode} from 'jwt-decode';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = getCookie("authToken");

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decoded: any = jwtDecode(token);
  const userRole = decoded.role;
  const requiredRoles: string[] = route.data['roles'];

  if (requiredRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/forbidden']);
  return false;
};
