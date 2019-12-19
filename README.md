# RxjsTimer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



STATE MANAGEMENT
Create a command$ observable of all inputs (counterUI.btnStart$, counterUI.btnPause$, counterUI.inputTickSpeed, etc..) and map them to state updates i.e. counterUI.btnStart$.pipe(mapTo({isTicking: true}))
Create a state$ observable. Start with initialConterState, use scan to merge updates from command$ in. Use shareReplay(1) to retrieve the last value emitted whenever you subscribe.
Subscribe to state$ and use console.log to test it.

RENDERING
Create a renderCountValue$ observable in section "SIDE EFFECTS" - "Input". Use tap to execute counterUI.renderDisplayText(). To optimize performance use the queryChange custom operator.
Place the new observable in the "SUBSCRUPTIONS" section under "Input" to test it.
TIMER
Create a timerProcessChange$ observable in the section "OBSERVABLES".
Use the state$ to get the isTicking value. Use the "switchMap NEVER" pattern from before to start a timer.
Create a programmaticCommands subject in section "STATE" - "Command"
Create a handleTimerProcessChange$ observable in section "SIDE EFFECTS" - "Outputs". Use the tap operator to call next() on programmaticCommands
BONUS
Explore the counterUI API by typing counterUI. somewhere in the index.ts file. ;)

Implement all the features of the counter:

Start, pause the counter. Then restart the counter (+)
Start it again from the paused number (++)
If Set to button is clicked set counter value to input value while counting (+++)
Reset to initial state if the reset button is clicked (+)
Is count up button is clicked count up (+)
Is count down button is clicked count down (+)
Change interval if input tickSpeed input changes (++)
Change count up if input countDiff changes (++)
Take care of rendering execution and other performance optimizations (+)
Some structure recommendations

// == CONSTANTS =========================================================== // = BASE OBSERVABLES ==================================================== // == SOURCE OBSERVABLES ================================================== // === STATE OBSERVABLES ================================================== // === INTERACTION OBSERVABLES ============================================ // == INTERMEDIATE OBSERVABLES ============================================ // = SIDE EFFECTS ========================================================= // == UI INPUTS =========================================================== // == UI OUTPUTS ========================================================== // == SUBSCRIPTION ======================================================== // === INPUTs ============================================================= // === OUTPUTS ============================================================ // = HELPER =============================================================== // = CUSTOM OPERATORS ===================================================== // == CREATION METHODS ==================================================== // == OPERATORS ===========================================================

