import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement, changeTitle } from '../state/counter.actions';
import { CounterState } from '@app/counter/state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styles: []
})
export class CustomCounterInputComponent implements OnInit {

  value = '';
  title = '';
  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit() {
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }))
  }

  setTitle() {
    this.store.dispatch(changeTitle({ title: this.title }))
  }

}
