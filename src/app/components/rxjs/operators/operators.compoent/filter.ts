import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>filter() Operator</h2>
    <p>filter() allows only values that pass a condition.</p>

    <button class="btn btn-success" (click)="run()">Run filter()</button>
    <div class="output" *ngIf="output">
  <h4>Output:</h4>
  <pre [innerHTML]="output"></pre>
</div>
  `
})
export class FilterComponent {
  output = '';

  run() {
    this.output = '';
    of(1, 2, 3, 4)
      .pipe(filter(x => x % 2 === 0))
      .subscribe(v => this.output += v + '\n');
  }
}
