import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-operator-list.component',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './operator-list.component.html',
  styleUrl: './operator-list.component.css',
})
export class OperatorListComponent {

}
