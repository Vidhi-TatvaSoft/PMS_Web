import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RoleService } from '../../../services/role/role-service';
import { CommonModule } from '@angular/common';
import { deleteCookie } from '../../../core/common-methods/cookie-helper';

@Component({
  selector: 'app-dashboard-component',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  constructor(
    public roleService: RoleService,
    private router: Router
  ) { }

  logout() {
    deleteCookie("authToken");
    this.router.navigate(['/login']);
  }
}
