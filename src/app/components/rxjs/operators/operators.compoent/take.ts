import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-take',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>take() Operator</h2>
    <p>take() emits only first N values then completes.</p>

    <button class="btn btn-success" (click)="run()">Run take()</button>
    <div class="output" *ngIf="output">
  <h4>Output:</h4>
  <pre [innerHTML]="output"></pre>
</div>
  `
})
export class TakeComponent {
  output = '';

  run() {
    this.output = '';

    interval(1000).pipe(take(3))
      .subscribe(v => this.output += v + '\n');
  }
}
