import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-fromevent-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>fromEvent() Operator</h2>
    <p>fromEvent() converts DOM events into Observables.</p>

    <button #btn>Click Me</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class FromEventComponent {
  output = '';

  @ViewChild('btn', { static: true }) btn!: ElementRef;

  ngOnInit() {
    fromEvent(this.btn.nativeElement, 'click')
      .subscribe(() => this.output += 'Button clicked!\n');
  }
}
