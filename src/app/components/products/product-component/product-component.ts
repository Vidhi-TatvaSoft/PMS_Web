import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductInlineEdit } from '../product-inline-edit/product-inline-edit';

@Component({
  selector: 'app-product-component',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ProductInlineEdit],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent {

}
