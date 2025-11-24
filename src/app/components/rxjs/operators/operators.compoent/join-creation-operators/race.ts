import { Component } from '@angular/core';
import { race, interval, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-race-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>race() Operator</h2>

    <p>
      <b>race()</b> listens to multiple Observables and the
      <b>first one to emit wins</b>. Others are ignored.
      <br>
      Example: Simulating two cab services — whichever responds first is selected.
    </p>

    <button class="btn btn-success" (click)="run()">Run race()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class RaceComponent {
  output = '';

  run() {
    this.output = 'Waiting for fastest option...\n';

    // Uber comes after 3 seconds
    const uber$ = interval(1000).pipe(
      take(2),
      map(() => 'Uber arrived!')
    );

    // Ola comes after 2 seconds
    const ola$ = interval(2000).pipe(
      take(2),
      map(() => 'Ola arrived!')
    );

    // race() will pick whichever emits first
    race(uber$, ola$).subscribe(result => {
      this.output += result + '\n';
    });
  }
}
