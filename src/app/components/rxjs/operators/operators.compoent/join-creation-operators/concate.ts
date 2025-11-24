import { Component } from '@angular/core';
import { concat, of, delay } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-concat-demo',
  imports: [CommonModule],
  styleUrls:['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>concat() Operator</h2>

    <p>
      <b>concat()</b> runs Observables one after another.
      It waits until the previous one <b>finishes</b>.
      This example simulates:
      <br>1. Fetching User
      <br>2. Fetching User Orders
    </p>

    <button (click)="run()" class="btn btn-success">Run concat()</button>

    <div class="output " *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class ConcatComponent {
  output = '';

  run() {
    this.output = 'Starting...\n';

    // First simulated API call
    const user$ = of("User fetched!").pipe(delay(2000)); // 2 sec delay

    // Second simulated API call
    const orders$ = of("User orders fetched!").pipe(delay(2000)); // 2 sec delay

    // concat ensures user$ completes before orders$ starts
    concat(user$, orders$).subscribe(value => {
      this.output += value + '\n';
    });
  }
}
