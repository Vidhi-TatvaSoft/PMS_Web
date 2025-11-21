import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-concat-map',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>concatMap() Operator</h2>
    <p>Runs inner observables one after another in order.</p>

    <button class="btn btn-success" (click)="run()">Run concatMap()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class ConcatMapComponent {
  output = '';

  run() {
    this.output = '';

    of(1, 2, 3)
      .pipe(
        concatMap(v => of(`Processed ${v}`).pipe(delay(400)))
      )
      .subscribe(v => this.output += v + '\n');
  }
}
