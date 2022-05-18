# Installation
In current example used version 10
```
npm i @ngrx/store@10
```

Add path to `tsconfig.json`
```
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"]
    },
    ....
  },
```

counter.state.ts
```
export interface CounterState {
  counter: number;
  title: string;
}

export const initialState: CounterState = {
  counter: 0,
  title: 'Counter example'
}

```

counter.actions.ts
```
import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');

export const customIncrement = createAction(
  'customIncrement',
  props<{ count: number }>()
);

export const changeTitle = createAction(
  'changeTitle',
  props<{ title: string }>()
)

```

counter.reducer.ts
```
import { createReducer, on } from "@ngrx/store"
import { changeTitle, customIncrement, decrement, increment, reset } from "./counter.actions"
import { initialState } from "./counter.state"

const _counterReducer = createReducer(initialState,
  on(increment, state => {
    return {
      ...state,
      counter: state.counter + 1
    }
  }),
  on(decrement, state => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }),
  on(reset, state => {
    return {
      ...state,
      counter: 0
    }
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
    counter: state.counter + action.count
    }
  }),
  on(changeTitle, (state, action) => {
    return {
      ...state,
      title: action.title
    }
  })
  )


export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action)
}

```

### Initialize the store in app.module
```
import { counterReducer } from '@app/counter/state/counter.reducer';
....

@NgModule({
  declarations: [
    ...
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
```

Subscribe on store value change
```
  counter = 0;
  constructor(private store: Store<{counter: { counter: number }}>) { }

  ngOnInit() {
    this.store.select('counter').subscribe(data => this.counter = data.counter)
  }
```

Or using `async` pipe in template
```
export class CounterOutputComponent implements OnInit {

  counter$: Observable<{ counter: number; title: string }>;

  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit() {
    this.counter$ = this.store.select('counter');
  }

}

```

View
```
<h3>Counter: {{ (counter$ | async).counter }}</h3>
```

The `this.store.select('counter')` has 2 params `counter` and `title`. We can create selectors to get only required properties from state

counter.selector.ts
```
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, state => state.counter)

export const getTitle = createSelector(getCounterState, state => state.title)

```

Usage
```
export class CounterOutputComponent implements OnInit {

  counter$: Observable<number>;
  title$: Observable<string>;

  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit() {
    this.counter$ = this.store.select(getCounter);
    this.title$ = this.store.select(getTitle);
  }

}

.....

<h3>Counter: {{ counter$ | async }}</h3>
<h4>Title is {{ title$ | async }}</h4>
```
