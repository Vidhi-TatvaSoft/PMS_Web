import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, interval, map, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-combine-latest',
  imports: [CommonModule],
  styleUrls: ['../../operator-list.component/operator-list.component.css'],
  template: `
   <h2>combineLatest() Weather Example</h2>
    <p>
      <b>combineLatest()</b> gives the <b>latest values</b> from each Observable
      whenever ANY of them changes.
    </p>
    <p>
      This example simulates a weather app updating
      <b>Temperature</b> and <b>Humidity</b> at different times.
      combineLatest() always gives the <b>latest</b> of both together.
    </p>

    <button (click)="run()" class="btn btn-success">Run Weather Example</button>

    <div class="output" *ngIf="output">
      <h4>Output:</h4>
      <pre>{{ output }}</pre>
    </div>
  `
})
export class CombineLatestComponent {
  output = '';

  run() {
    this.output = 'Fetching weather...\n';

    // Temperature updates every 1 sec
    const temp$ = interval(1000).pipe(
      map(i => `Temperature: ${25 + i}°C`)
      , take(6)
    );

    // Humidity updates every 2 sec
    const humidity$ = interval(2000).pipe(
      map(i => `Humidity: ${50 + i}%`),
      take(3)
    );

    combineLatest([temp$, humidity$]).subscribe(([temp, hum]) => {
      this.output += `${temp} | ${hum}\n`;
    });
  }
}
