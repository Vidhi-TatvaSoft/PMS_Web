import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail-component',
  imports: [CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.css',
})
export class ProductDetailComponent {
  @Input() data: any;
}
