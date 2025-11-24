import { Component } from '@angular/core';
import { merge, interval, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-merge-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>merge() Operator</h2>

    <p>
      <b>merge()</b> combines multiple Observables and emits values
      <b>as soon as they arrive</b> — no waiting.
      <br>
      Example: Receiving Notifications and Messages in real-time.
    </p>

    <button class="btn btn-success" (click)="run()">Run merge()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class MergeComponent {
  output = '';

  run() {
    this.output = 'Listening...\n';

    // Notifications every 2 seconds
    const notifications$ = interval(2000).pipe(
      take(3),
      map(i => `Notification ${i + 1}`)
    );

    // Messages every 3 seconds
    const messages$ = interval(3000).pipe(
      take(3),
      map(i => `Message ${i + 1}`)
    );

    // merge emits both as they come
    merge(notifications$, messages$).subscribe(value => {
      this.output += value + '\n';
    });
  }
}
