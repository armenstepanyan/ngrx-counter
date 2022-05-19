import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement, changeTitle } from '../state/counter.actions';
import { AppState } from '@app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styles: []
})
export class CustomCounterInputComponent implements OnInit {

  value = '';
  title = '';
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }))
  }

  setTitle() {
    this.store.dispatch(changeTitle({ title: this.title }))
  }

}
