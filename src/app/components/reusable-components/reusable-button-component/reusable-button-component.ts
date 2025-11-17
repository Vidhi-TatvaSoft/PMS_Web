import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reusable-button-component',
  imports: [CommonModule],
  templateUrl: './reusable-button-component.html',
  styleUrl: './reusable-button-component.css',
})
export class ReusableButtonComponent {

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string = 'click me';
  @Input() route?: string;
  @Input() routeId?: number | string;
  @Input() disabled: boolean = false;
  @Input() btnClass: string = 'btn btn-outline-success';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (this.route) {
      let fullRoute = this.routeId ? `${this.route}/${this.routeId}` : this.route;
      console.log(fullRoute)
      this.router.navigate([fullRoute]);
    } else {
      this.clicked.emit();
    }
  }

  constructor(private router: Router) {
    // console.log("constructor");
  }

  // once after first render
  ngOnInit(): void {
    // console.log("ngOnInit");
  }

  // every time input changes
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("ngOnChanges", changes);
  }

  // before component destroy
  ngOnDestroy(): void {
    // console.log("ngOnDestroy");
  }
}
