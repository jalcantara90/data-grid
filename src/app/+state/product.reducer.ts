import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { ProductEntity } from './product.models';

export const PRODUCT_FEATURE_KEY = 'product';

export interface ProductState extends EntityState<ProductEntity> {
  selectedId?: string | number; // which Product record has been selected
  loaded: boolean; // has the Product list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProductPartialState {
  readonly [PRODUCT_FEATURE_KEY]: ProductState;
}

export const productAdapter: EntityAdapter<ProductEntity> = createEntityAdapter<ProductEntity>();

export const initialProductState: ProductState = productAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const reducer = createReducer(
  initialProductState,
  on(ProductActions.initProduct,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(ProductActions.loadProductSuccess,
    (state, { product }) => productAdapter.setAll(product, { ...state, loaded: true })
  ),
  on(ProductActions.loadProductFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}
