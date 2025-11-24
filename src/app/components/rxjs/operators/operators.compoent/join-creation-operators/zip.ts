import { Component } from '@angular/core';
import { zip, interval, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-zip-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>zip() Operator</h2>

    <p>
      <b>zip()</b> pairs values from multiple Observables
      <b>one-by-one</b>, similar to zipping a chain.
      <br>
      Example: Pairing Customer Names with their Orders.
    </p>

    <button class="btn btn-success" (click)="run()">Run zip()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class ZipComponent {
  output = '';

  run() {
    this.output = 'Pairing values...\n';

    // Customer names (every 2 seconds)
    const names$ = interval(2000).pipe(
      take(4),
      map(i => `Customer ${i + 1}`)
    );

    // Orders (every 3 seconds)
    const orders$ = interval(3000).pipe(
      take(3),
      map(i => `Order #${100 + i}`)
    );

    // zip pairs them one-by-one
    zip(names$, orders$).subscribe(([name, order]) => {
      this.output += `${name} → ${order}\n`;
    });
  }
}
