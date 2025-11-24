import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../../core/common-methods/cookie-helper';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  getRole(): string | null {
    const token = getCookie("authToken")
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === "Admin";
  }

  hasRole(required: string[]): boolean {
    const role = this.getRole();
    return required.includes(role ?? "");
  }
}
