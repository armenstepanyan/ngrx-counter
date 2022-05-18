import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '@app/counter/state/counter.reducer';
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

