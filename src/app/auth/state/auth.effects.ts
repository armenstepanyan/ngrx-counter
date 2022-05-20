import { AuthService } from '@app/services/auth.service';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '@app/models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { setErrorMessage, setLoadingSpinner } from '@app/store/shared';
import { of } from 'rxjs';
import { Router } from '@angular/router';

interface ErrorMessage {
  error: {
    message: string;
  }
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
    ) {}

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

  // dispatch: false -> do not return any observable
  // when loginSuccess is happen this function should works
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        // ofType(loginSuccess),
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          // clear error
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            return signupSuccess({ user });
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

}
