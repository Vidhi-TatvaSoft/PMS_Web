import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ajax-demo',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
    <h2>ajax() Operator</h2>

    <p>
      ajax() is used to make HTTP requests using RxJS.
      It returns an Observable containing the full AJAX response.
    </p>

    <button (click)="run()">Run ajax()</button>
    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre [innerHTML]="output"></pre>
    </div>
  `
})
export class AjaxComponent {
  output = '';

  run() {
    this.output = 'Loading...\n';

    ajax('https://jsonplaceholder.typicode.com/users/1')
      .pipe(
        catchError(err => {
          this.output += 'Error: ' + err.message;
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          this.output += JSON.stringify(res.response, null, 2);
        }
      });
  }
}
