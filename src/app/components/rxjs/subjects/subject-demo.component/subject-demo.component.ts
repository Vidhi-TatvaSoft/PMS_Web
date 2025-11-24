import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subject-demo.component',
  imports: [CommonModule],
  templateUrl: './subject-demo.component.html',
  styleUrl: './subject-demo.component.css',
})
export class SubjectDemoComponent {

  selectedType: string | null = null;
  typeDefinition: string = '';
  output: string = '';

  // Select Subject Type
  selectType(type: string) {
    this.selectedType = type;
    this.output = '';

    switch (type) {
      case 'Subject':
        this.typeDefinition = `
A Subject sends values to all subscribers at the same time.. <br>
✔ Multiple subscribers get SAME emitted value.<br>
✔ If an Observable emits values, each subscriber gets its own copy of the values (separate stream).<br>
✔ A Subject sends values to all subscribers at the same time. <br>
✔ Only sends future value after subscribe, new subscriber get nothing. <br>
        `;
        break;

      case 'Behavior':
        this.typeDefinition = `
BehaviorSubject requires a DEFAULT value. <br>
✔ Emits the latest value immediately upon subscription. <br>
✔ Subscribers always receive the last emitted value. <br>
✔ Does not store all values from initial value, only stored latest value. <br>
        `;
        break;

      case 'Replay':
        this.typeDefinition = `
ReplaySubject replays old values to NEW subscribers. <br>
✔ Stores a buffer of n previous values (n is specified, if not specified then take all values from initia value). <br>
✔ New subscribers get old n values + future values. <br>
        `;
        break;

      case 'Async':
        this.typeDefinition = `
AsyncSubject emits ONLY the LAST value when complete() is called. <br>
✔ Subscribers get one final value. <br>
✔ Useful for API caching. <br>
        `;
        break;
    }
  }

  runDemo() {
    this.output = '';

    // SUBJECT
    if (this.selectedType === 'Subject') {
      const subject = new Subject<number>();
      subject.subscribe(v => this.output += `Subscriber 1: ${v}\n`);
      subject.next(1);
      subject.next(2);
      subject.subscribe(v => this.output += `Subscriber 2: ${v}\n`);
      subject.next(3);
      subject.complete();
    }

    // BEHAVIOR SUBJECT
    if (this.selectedType === 'Behavior') {
      const behavior = new BehaviorSubject<number>(100);
      behavior.subscribe(v => this.output += `Subscriber 1: ${v}\n`);
      behavior.next(200);
      behavior.next(300);
      behavior.subscribe(v => this.output += `Subscriber 2: ${v}\n`);
      behavior.next(400);
      behavior.complete();
    }

    // REPLAY SUBJECT
    if (this.selectedType === 'Replay') {
      const replay = new ReplaySubject<number>(2); // buffer size = 2
      replay.next(10);
      replay.next(20);
      replay.next(30);
      replay.subscribe(v => this.output += `Subscriber 1: ${v}\n`);
      replay.next(40);
      replay.subscribe(v => this.output += `Subscriber 2: ${v}\n`);
      replay.complete();
    }

    // ASYNC SUBJECT
    if (this.selectedType === 'Async') {
      const async = new AsyncSubject<number>();
      async.subscribe(v => this.output += `Subscriber 1: ${v}\n`);
      async.next(10);
      async.next(20);
      async.subscribe(v => this.output += `Subscriber 2: ${v}\n`);
      async.next(30);
      async.complete(); // emits ONLY the last value (30)
    }
  }
}
