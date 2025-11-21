import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-reduce',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>reduce() Operator</h2>
    <p>Accumulates values into a single final result.</p>

    <button class="btn btn-success" (click)="run()">Run reduce()</button>

    <div class="output" *ngIf="output">
      <h4>Sum:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class ReduceComponent {
  output = '';

  run() {
    this.output = '';

    from([5, 10, 15])
      .pipe(
        reduce((acc, v) => acc + v, 0)
      )
      .subscribe(sum => this.output = 'Total = ' + sum);
  }
}
