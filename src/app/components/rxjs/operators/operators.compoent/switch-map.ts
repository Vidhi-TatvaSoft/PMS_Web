import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, of, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-switchmap',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>switchMap() Operator</h2>
    <p>switchMap() cancels previous observable and switches to new one. </p>

    <button class="btn btn-success" (click)="run()">Run switchMap()</button>
    <div class="output" *ngIf="output">
  <h4>Output:</h4>
  <pre [innerHTML]="output"></pre>
</div>
  `
})
export class SwitchMapComponent {
  output = '';

  run() {
    this.output = '';

    of(10,20,30)
      .pipe(
        switchMap(() => interval(300).pipe(take(3)))
      )
      .subscribe(v => this.output += 'Emitted: ' + v + '\n');
  }
}
