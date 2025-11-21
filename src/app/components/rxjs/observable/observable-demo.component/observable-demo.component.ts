import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-demo.component',
  imports: [CommonModule],
  templateUrl: './observable-demo.component.html',
  styleUrl: './observable-demo.component.css',
})
export class ObservableDemoComponent {
  output = '';

  startObservable() {
    const timeObservable = new Observable(observer => {
      setTimeout(() => observer.next("Observable running"));
      setTimeout(() => observer.next("First value after 1 sec"), 1000);
      setTimeout(() => observer.next("Second value after 2 sec"), 2000);
      setTimeout(() => observer.complete(), 3000);
    });

    const observer = {
      next: (value: any) => (this.output += value + ' <br> '),
      error: (err: any) => (this.output += 'Error: ' + err + '<br>'),
      complete: () => (this.output += 'Observable Completed! <br>')
    };

    timeObservable.subscribe(observer);
  }
}
