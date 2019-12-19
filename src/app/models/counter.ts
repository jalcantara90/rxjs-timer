
import { Subject, Observable, fromEvent} from 'rxjs';
import { mapTo, map, withLatestFrom, startWith, shareReplay} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface CounterConfig {
  initialSetTo?: number;
  initialTickSpeed?: number;
  initialCountDiff?: number;
}

export interface CountDownState {
  isTicking: boolean;
  count: number;
  countUp: boolean;
  tickSpeed: number;
  countDiff: number;
}

export type PartialCountDownState =
{ isTicking: boolean } |
{ count: number } |
{ countUp: boolean } |
{ tickSpeed: number } |
{ countDiff: number};

export enum ConterStateKeys {
  isTicking = 'isTicking',
  count = 'count',
  countUp = 'countUp',
  tickSpeed = 'tickSpeed',
  countDiff = 'countDiff'
}

export enum ActionNames {
  Start,
  Pause,
  Reset,
  SetTo,
  Down,
  Up,
  TickSpeed,
  CountDiff
}

enum ElementIds {
  TimerDisplay = 'timer-display',
  BtnStart = 'btn-start',
  BtnPause = 'btn-pause',
  BtnUp = 'btn-up',
  BtnDown = 'btn-down',
  BtnReset = 'btn-reset',
  BtnSetTo = 'btn-set-to',
  InputSetTo = 'set-to-input',
  InputTickSpeed = 'tick-speed-input',
  InputCountDiff = 'count-diff-input'
}

export class Counter {

  private initialSetTo: number;
  private initialTickSpeed: number;
  private initialCountDiff: number;

  public countDiffInput: FormControl ;
  public tickSpeedInput: FormControl;
  public setToInput: FormControl;

  // Subject to emit events
  public btnStartSubject: Subject<ActionNames>;
  public btnPauseSubject: Subject<ActionNames>;
  public btnUpSubject: Subject<ActionNames>;
  public btnDownSubject: Subject<ActionNames>;
  public btnResetSubject: Subject<ActionNames>;
  public btnSetToSubject: Subject<number>;

  public btnStart$: Observable<ActionNames>;
  public btnPause$: Observable<ActionNames>;
  public btnUp$: Observable<ActionNames>;
  public btnDown$: Observable<ActionNames>;
  public btnReset$: Observable<ActionNames>;
  public btnSetTo$: Observable<number>;

  public inputTickSpeed$: Observable<number>;
  public inputCountDiff$: Observable<number>;
  public inputSetTo$: Observable<number>;

  constructor(config?: CounterConfig) {
    this.initialTickSpeed = config && config.initialTickSpeed || 1000;
    this.initialSetTo = config && config.initialSetTo || 0;
    this.initialCountDiff = config && config.initialCountDiff || 1;

    this.init();
  }

  private init() {

    this.countDiffInput = new FormControl(this.initialCountDiff);
    this.tickSpeedInput = new FormControl(this.initialTickSpeed);
    this.setToInput = new FormControl(this.initialSetTo);

    // setup observables
    this.btnStartSubject = new Subject();
    this.btnStart$ = this.btnStartSubject
      .asObservable()
      .pipe(mapTo(ActionNames.Start));

    this.btnPauseSubject = new Subject();
    this.btnPause$ = this.btnPauseSubject
      .asObservable()
      .pipe(mapTo(ActionNames.Pause));

    this.btnUpSubject = new Subject();
    this.btnUp$ = this.btnUpSubject
      .asObservable()
      .pipe(mapTo(ActionNames.Up));

    this.btnDownSubject = new Subject();
    this.btnDown$ = this.btnDownSubject
      .asObservable()
      .pipe(mapTo(ActionNames.Down));

    this.btnResetSubject = new Subject();
    this.btnReset$ = this.btnResetSubject
      .asObservable()
      .pipe(mapTo(ActionNames.Reset));

    this.inputSetTo$ = this.setToInput.valueChanges.pipe(startWith(this.initialSetTo));
    this.inputTickSpeed$ = this.tickSpeedInput.valueChanges.pipe(startWith(this.initialTickSpeed));
    this.inputCountDiff$ = this.countDiffInput.valueChanges.pipe(startWith(this.initialCountDiff));

    this.btnSetToSubject = new Subject();
    this.btnSetTo$ = this.btnSetToSubject.asObservable().pipe(
      mapTo(ActionNames.SetTo),
      withLatestFrom(this.inputSetTo$, (_, i$) => i$)
    );

  }

}

function getCommandObservableByElem(elemId: string, eventName: string, command: ActionNames) {
  return fromEvent(document.getElementById(elemId), eventName).pipe(mapTo(command));
}

function getValueObservable(elemId: string, eventName: string): Observable<number> {
const elem = document.getElementById(elemId);
return fromEvent(elem, eventName)
  .pipe(
    map(v => v.target['value']),
    map(v => parseInt(v, 10)),
    shareReplay(1)
  );
}
