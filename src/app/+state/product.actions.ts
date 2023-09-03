import { createAction, props } from '@ngrx/store';
import { ProductEntity } from './product.models';

export const initProduct = createAction(
  '[Product Page] Init'
);

export const loadProductSuccess = createAction(
  '[Product/API] Load Product Success',
  props<{ product: ProductEntity[] }>()
);

export const loadProductFailure = createAction(
  '[Product/API] Load Product Failure',
  props<{ error: any }>()
);
