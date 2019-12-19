import { Component } from '@angular/core';
import { TimerService } from './services/timer.service';
import { CountDownState, Counter } from './models/counter';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public timerService: TimerService) {}

  diff = this.timerService.uiTimer.countDiffInput;
  speedTick = this.timerService.uiTimer.tickSpeedInput;
  setTo = this.timerService.uiTimer.setToInput;


  startTimer() {

  }

  pauseTimer() {

  }

  setTimerTo() {

  }

  resetTimer() {

  }

  countUpTimer() {

  }

  countDownTimer() {

  }

  countDiffTimer() {

  }
}
