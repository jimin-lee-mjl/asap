import { ProductActionTypes } from './types';

export const setProducts = (products) => {
  return {
    type: ProductActionTypes.SET_PRODUCTS,
    payload: products,
  };
};
