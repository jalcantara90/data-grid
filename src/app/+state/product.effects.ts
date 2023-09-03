import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.initProduct),
    switchMap(() => of(ProductActions.loadProductSuccess({ product: [] }))),
    catchError((error) => {
        console.error('Error', error);
        return of(ProductActions.loadProductFailure({ error }));
      }
    )
  ));
}
