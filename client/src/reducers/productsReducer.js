import { ProductActionTypes } from '../actions/types';

const initialState = {
  products: [],
};

export const setProductsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};
