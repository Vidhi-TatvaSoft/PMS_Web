import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-debounce-time',
  imports: [CommonModule],
  styleUrls: ['../operator-list.component/operator-list.component.css'],
  template: `
    <h2>debounceTime() Operator</h2>
    <p>Emits the value only after a specified time of silence.</p>

    <input type="text" (input)="onInput($event)" placeholder="Type quickly..." />

    <div class="output" *ngIf="output">
      <h4>Debounced Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class DebounceTimeComponent {
  output = '';
  private subject = new Subject<string>();

  constructor() {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(val => this.output = val);
  }

  onInput(e: any) {
    this.subject.next(e.target.value);
  }
}
