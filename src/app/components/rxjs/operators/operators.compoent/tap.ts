import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-tap',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>tap() Operator</h2>
    <p>Performs side effects without changing the stream values.</p>

    <button class="btn btn-success" (click)="run()">Run tap()</button>

    <div class="output" *ngIf="output">
      <h4>Tap Logs:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class TapComponent {
  output = '';

  run() {
    this.output = '';

    of(10, 20, 30)
      .pipe(
        tap(v => this.output += `TAP: ${v}\n`)
      )
      .subscribe();
  }
}
