import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-interval-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>interval() Operator</h2>
    <p>interval() emits numbers in sequence with a fixed delay.</p>

    <button (click)="run()">Run interval()</button>

   <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class IntervalComponent {
  output = '';

  run() {
    this.output = '';

    interval(1000)
      .pipe(take(4))
      .subscribe(v => this.output += 'Tick: ' + v + '\n');
  }
}
