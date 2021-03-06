import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounter, getTitle } from '@app/counter/state/counter.selectors';
import { AppState } from '@app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

  counter$: Observable<number>;
  title$: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.counter$ = this.store.select(getCounter);
    this.title$ = this.store.select(getTitle);
  }

}
