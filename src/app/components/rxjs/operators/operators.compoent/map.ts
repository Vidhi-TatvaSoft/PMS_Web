import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  standalone: true,
  imports:[CommonModule],
  styleUrls:['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>map() Operator</h2>

    <p>map() transforms each value emitted by an Observable.</p>

    <button class="btn btn-success" (click)="run()">Run map()</button>

    <div class="output" *ngIf="output">
     <h4>Output:</h4>
     <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class MapComponent {
  output = '';

  run() {
    this.output = '';

    of(1, 2, 3)
      .pipe(map(x => x * 10))
      .subscribe(v => this.output += v + '\n');
  }
}
