import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authActions } from './auth-action';
import { switchMap, catchError, of, map } from 'rxjs';
import { MyStorage } from '../services/storage';
import { extractToken } from '../util/extractToken';
import { NgToastService } from 'ng-angular-popup';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    storage = inject(MyStorage),
    toast = inject(NgToastService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap((loginRequest) => {
        return authApi.login(loginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/products');
            toast.success('Login successful!', 'SUCCESS');
            storage.setItem('ngrxstore_Item', response.token);
            const payload = extractToken(response.token);
            if (payload) {
              console.log('User ID:', payload.sub);
              console.log('Username:', payload.user);
              return authActions.loginSuccess({ token: response.token, userId: payload.sub });
            }
            return authActions.loginSuccess({ token: response.token, userId: null });
          }),
          catchError((error) => {
            toast.danger('Login failed!', 'ERROR');
            return of(authActions.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    toast = inject(NgToastService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((registerRequest) => {
        return authApi.register(registerRequest).pipe(
          map(() => {
            router.navigateByUrl('/login');
            toast.success('Registration successful!', 'SUCCESS');
            return authActions.registerSuccess();
          }),
          catchError((error) => {
            toast.danger('Registration failed!', 'ERROR');
            return of(authActions.registerFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage), router = inject(Router), toast = inject(NgToastService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        storage.removeItem('ngrxstore_token');
        router.navigateByUrl('/login');
        toast.success('Logout Successful', 'SUCCESS');
        return authActions.logoutSuccess();
      })
    );
  },
  {
    functional: true,
  }
);
