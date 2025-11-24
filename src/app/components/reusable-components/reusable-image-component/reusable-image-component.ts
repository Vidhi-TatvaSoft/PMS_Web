import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-image-component',
  imports: [],
  templateUrl: './reusable-image-component.html',
  styleUrl: './reusable-image-component.css',
})
export class ReusableImageComponent {
  @Input() imgSrc: string | ArrayBuffer = '';
  @Input() imgHeight?: number = 25;
  @Input() imgWidth?: number = 25;
  @Input() imgAlt?: string = '';
  @Input() imgClass?: string = '';
}
