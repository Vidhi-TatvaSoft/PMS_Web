import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-merge-map',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>mergeMap() Operator</h2>
    <p>Maps each value to an observable and flattens them concurrently.</p>

    <button class="btn btn-success" (click)="run()">Run mergeMap()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class MergeMapComponent {
  output = '';

  run() {
    this.output = '';

    of('A', 'B', 'C')
      .pipe(mergeMap(v => of(v + ' processed')))
      .subscribe(v => this.output += v + '\n');
  }
}
