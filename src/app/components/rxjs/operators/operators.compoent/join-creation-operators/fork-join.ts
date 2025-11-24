import { Component } from '@angular/core';
import { forkJoin, of, delay } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-forkjoin-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>forkJoin() Operator</h2>

    <p>
      <b>forkJoin()</b> waits for ALL Observables to complete and then gives
      a <b>single final result</b>.
      <br>
      This example simulates:
      <br>1. Fetching User
      <br>2. Fetching User Orders
      <br>
      Final output appears only when BOTH finish.
    </p>

    <button (click)="run()" class="btn btn-success">Run forkJoin()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class ForkJoinComponent {
  output = '';

  run() {
    this.output = 'Loading...\n';

    // Simulated API: Fetch user (takes 2 seconds)
    const user$ = of({ id: 1, name: "John Doe" }).pipe(delay(2000));

    // Simulated API: Fetch orders (takes 3 seconds)
    const orders$ = of([
      { orderId: 101, item: 'Laptop' },
      { orderId: 102, item: 'Mobile' }
    ]).pipe(delay(3000));

    // forkJoin waits for BOTH user$ and orders$
    forkJoin({ user: user$, orders: orders$ }).subscribe(result => {
      this.output += JSON.stringify(result, null, 2);
    });
  }
}
