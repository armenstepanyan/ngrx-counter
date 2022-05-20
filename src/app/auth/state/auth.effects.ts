import { AuthService } from '@app/services/auth.service';
import { exhaustMap, map } from 'rxjs/operators';
import { loginStart, loginSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '@app/models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { setLoadingSpinner } from '@app/store/shared';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
    ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))
            const user = this.authService.formatUser(data)
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}
