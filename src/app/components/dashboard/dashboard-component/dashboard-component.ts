import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RoleService } from '../../../services/role/role-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  constructor(public roleService: RoleService) { }
}
