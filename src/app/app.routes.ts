import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { productFeatures } from './pages/products/store/product-feature';
import * as productEffect from './pages/products/store/product-effect';
import { profileFeatures } from './pages/profile/store/profile-feature';
import * as profileEffect from './pages/profile/store/profile-effect';
import { cartFeature } from './pages/cart/store/cart-feature';
import * as cartEffect from './pages/cart/store/cart-effect';
import { authGuard } from './core/gaurds/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    providers: [provideState(cartFeature), provideEffects(cartEffect)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((m) => m.Products),
        providers: [provideState(productFeatures), provideEffects(productEffect)],
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
        providers: [provideState(profileFeatures), provideEffects(profileEffect)],
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
      },
    ],
  },
];
