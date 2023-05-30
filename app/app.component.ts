import { Component } from '@angular/core';
import { concat, interval } from 'rxjs';
import { take, skip, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <h2>RxJS Operators Example</h2>
    <button (click)="startOperators()">Start Operators</button>
    <div>
      <div class="column">
        <h3>Concat,Take!</h3>
        <ul>
          <li *ngFor="let value of source1Values">{{ value }}</li>
        </ul>
      </div>
      <div class="column">
        <h3>Skip!</h3>
        <ul>
          <li *ngFor="let value of source2Values">{{ value }}</li>
        </ul>
      </div>
      <div class="column">
        <h3>DebounceTime!</h3>
        <ul>
          <li *ngFor="let value of source3Values">{{ value }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .column {
      display: inline-block;
      vertical-align: top;
      margin: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `]
})
export class AppComponent {
  source1Values: number[] = [];
  source2Values: number[] = [];
  source3Values: number[] = [];

  startOperators() {
    const source1$ = interval(1000).pipe(take(5));
    const source2$ = interval(500).pipe(take(5), skip(2));
    const source3$ = interval(500).pipe(take(5), debounceTime(1000));

    source1$.subscribe((value) => {
      this.source1Values.push(value);
    });

    source2$.subscribe((value) => {
      this.source2Values.push(value);
    });

    source3$.subscribe((value) => {
      this.source3Values.push(value);
    });
  }
}
