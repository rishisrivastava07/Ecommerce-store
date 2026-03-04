import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApi } from '../services/product-api';
import { catchError, map, of, switchMap } from 'rxjs';
import { productActions } from './product-actions';

export const productEffect = createEffect(
  (action$ = inject(Actions), productApi = inject(ProductApi)) => {
    return action$.pipe(
      ofType(productActions.load),
      switchMap(() => {
        return productApi.getProducts().pipe(
          map((products) => productActions.loadSuccess({ products })),
          catchError((error) => of(productActions.loadFailure({ error }))),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
