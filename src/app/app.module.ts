import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CounterComponent,
    CustomCounterInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ counter: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
initialize the store in app.module

display

  counter: number;
  constructor(private store: Store<{counter: { counter: number }}>) { }

  ngOnInit() {
    this.store.select('counter').subscribe(data => this.counter = data.counter)
  }

  now this.store.select('counter') has 2 params counter and title
  we can create selectors to get only required properties from state

  selectors

export const getCounter = createSelector(getCounterState, state => state.counter)

export const getTitle = createSelector(getCounterState, state => state.title)
 this.store.select(getTitle).subscribe(title => {
      console.log("title is", title)
      this.title = title
    })
*/
