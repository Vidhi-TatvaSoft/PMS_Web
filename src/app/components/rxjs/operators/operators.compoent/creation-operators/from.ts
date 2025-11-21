import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-from-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>from() Operator</h2>
    <p>from() converts arrays, promises, or iterables into an Observable.</p>

    <button (click)="run()">Run from()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class FromComponent {
  output = '';

  run() {
    this.output = '';

    const arr = ['A', 'B', 'C'];

    from(arr).subscribe(v => this.output += v + '\n');
  }
}
