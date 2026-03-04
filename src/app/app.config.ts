import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgToast } from 'ng-angular-popup';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { loginEffect, registerEffect } from './shared/store/auth-effects';
import { authFeatures } from './shared/store/auth-feature';
import * as authEffects from './shared/store/auth-effects';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(authEffects),
    provideState(authFeatures),
    { provide: API_URL, useValue: 'https://fakestoreapi.com' },
    provideNgToast({
      duration: 5000,
      position: 'toaster-top-right',
      minWidth: 200,
    })
  ]
};
