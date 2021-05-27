import { ProductActionTypes } from '../actions/types';

const initialState = {
  products: {
    outer: [],
    top: [],
    bottom: [],
  },
  selectedProducts: {
    outer: [],
    top: [],
    bottom: [],
  },
};

export const setProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const selectProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SELECT_PRODUCT:
      return { ...state, selectedProducts: action.payload };
    default:
      return state;
  }
};

export const wishProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SELECT_PRODUCT:
      return { ...state, selectedProducts: action.payload };
    default:
      return state;
  }
};
