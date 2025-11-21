import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-first',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>first() Operator</h2>
    <p>Emits only the first value from the observable.</p>

    <button class="btn btn-success" (click)="run()">Run first()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class FirstComponent {
  output = '';

  run() {
    this.output = '';

    of(100, 200, 300)
      .pipe(first(v => v > 150))
      .subscribe(v => this.output = 'First emitted: ' + v);
  }
}
