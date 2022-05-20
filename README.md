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

Install Redux Chrome Extension and ngrx store dev tools for debugging
```
npm install @ngrx/store-devtools@10 
```
### Create app store
Application should have only one state. Combine all reducers into one main app reducer

app/store/app.state.ts
```
import { counterReducer } from "@app/counter/state/counter.reducer";
import { CounterState } from "@app/counter/state/counter.state";
import { postsReducer } from "@app/posts/state/posts.reducer";
import { PostsState } from "@app/posts/state/posts.state";

export interface AppState {
  counter: CounterState,
  posts: PostsState
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer
}

```

app.module
```
  imports: [
    BrowserModule,
    FormsModule,
    ....
    StoreModule.forRoot(appReducer),
  ]
```

### Lazy load the ngrx state using for Feature store Module
Remove reducers from app.module and add them to features modules
app.module.ts
```
@NgModule({
  declarations: [],
  imports: [    
    StoreModule.forRoot({}),
    
  ]
})
```

posts.module.ts
```
import { POSTS_STATE_NAME } from './state/posts.selector';
import { postsReducer } from './state/posts.reducer';

@NgModule({
  declarations: [],
  imports: [
    ...
    StoreModule.forFeature(POSTS_STATE_NAME, postsReducer)
  ],
})
export class PostsModule {}
```

### Install ngrx/effects
```
npm i @ngrx/effects@10
```

Register in app.module
```
@NgModule({
  declarations: [ ],
  imports: [
    ...
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Register effects for feature modules
auth.module.ts
```
@NgModule({
  declarations: [LoginComponent],
  imports: [
    ...
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}

```

auth.effects.ts
```
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart), // <-- action name
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            const user = this.authService.formatUser(data)
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}

```
auth.reducer
```
const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }), 
);
```

auth.service
```
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }
 }

```
`loginStart` action is called in login.component.ts and now the effects is listening this action instead of reducer
```
onLoginSubmit() {
   const { email, password } = this.loginForm.value;
   this.store.dispatch(loginStart({ email, password }));
  }

```

Handle http errors

```
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            // hide loader
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // clear errors messages
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data)
            return loginSuccess({ user });
          }),
          catchError(errorResponse => {
            const resp = errorResponse.error as ErrorMessage;
            const message = this.authService.getErrorMessage(resp.error.message);
            // hide loader
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });
```

Redirect to home page after login. `dispatch: false` means that createEffect do not return any observable
when `loginSuccess` is happen this function should works
```
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        // or multiple actions
        // ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
```
Now we need to move authState to global state because auth.user is used in header component.
Need to remove `StoreModule.forFeature` and still keep `EffectsModule.forFeature([AuthEffects])` in auth.module.ts

```
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer), <- reomove this>
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes)
  ],
})
export class AuthModule {}
```
