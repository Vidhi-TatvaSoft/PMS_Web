import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-first',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>of() Operator</h2>
    <p>Converts the arguments to an observable sequence.</p>
    <p>It emits the values synchronously, one by one, and then completes.</p>

    <button class="btn btn-success" (click)="run()">Run of()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class OfComponent {
  output = '';

  run() {
    this.output = '';

    of(1, 2, 3).subscribe({
      next: (v:any) => this.output += 'value: '+v +'\n' ,
      complete: () => this.output += "complete"
    });
  }
}
