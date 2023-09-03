import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProductActions from './product.actions';
import { ProductEffects } from './product.effects';

describe('ProductEffects', () => {
  let actions: Observable<Action>;
  let effects: ProductEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(ProductEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductActions.initProduct() });

      const expected = hot('-a-|', { a: ProductActions.loadProductSuccess({ product: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
