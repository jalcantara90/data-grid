import { Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { ProductEntity } from './product.models';
import { ProductState, initialProductState, productReducer } from './product.reducer';

describe('Product Reducer', () => {
  const createProductEntity = (id: string, name = ''): ProductEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Product actions', () => {
    it('loadProductSuccess should return the list of known Product', () => {
      const product = [
        createProductEntity('PRODUCT-AAA'),
        createProductEntity('PRODUCT-zzz')
      ];
      const action = ProductActions.loadProductSuccess({ product });

      const result: ProductState = productReducer(initialProductState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = productReducer(initialProductState, action);

      expect(result).toBe(initialProductState);
    });
  });
});
