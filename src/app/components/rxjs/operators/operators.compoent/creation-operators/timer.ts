import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-timer-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>timer() Operator</h2>
    <p>timer() emits after a delay, or starts interval emissions.</p>

    <button (click)="run()">Run timer()</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class TimerComponent {
  output = '';

  run() {
    this.output = '';

    timer(2000).subscribe(() => this.output += 'Timer fired after 2 seconds');
  }
}
