import { Injectable } from '@angular/core';
import { Counter, CountDownState } from '../models/counter';
import { merge } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  initialConterState: CountDownState = {
    isTicking: false,
    count: 0,
    countUp: true,
    tickSpeed: 200,
    countDiff: 1
  };

  public uiTimer: Counter = new Counter({
    initialTickSpeed: this.initialConterState.tickSpeed,
    initialCountDiff: this.initialConterState.countDiff,
    initialSetTo: this.initialConterState.count + 10
  });

  count$ = merge(
    this.uiTimer.btnStart$,
    this.uiTimer.btnPause$
  ).subscribe(data => console.log(data));

  constructor() { }
}
