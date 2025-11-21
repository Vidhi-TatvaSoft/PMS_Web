import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe-demo.component',
  imports: [CommonModule],
  templateUrl: './subscribe-demo.component.html',
  styleUrl: './subscribe-demo.component.css',
})
export class SubscribeDemoComponent {
  output: string = '';

  startsubscription() {
    const subscriptionvar = interval(1000).subscribe(value => {
      this.output += `Tick ${value} <br>`;
    });

    // Stop after 5 sec
    setTimeout(() => {
      subscriptionvar.unsubscribe();
      this.output += `unsubscribe <br>`;
    }, 5000);
  }


}
