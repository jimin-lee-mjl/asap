import { ProductActionTypes } from '../actions/types';

const initialState = {
  products: {
    outer: [],
    top: [],
    bottom: [],
  },
  category: [],
  selectedProducts: {
    outer: [],
    top: [],
    bottom: [],
  },
  likeProducts: [],
  modals: {},
  cartList: [],
  likesList: [],
  orderDetails: [],
  modalKey: '',
};

export const setProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const setCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_CATEGORY:
      return { ...state, category: action.payload };
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

export const showModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SHOW_MODAL:
      return { ...state, modalKey: action.payload };
    default:
      return state;
  }
};

export const likeProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.LIKE_PRODUCT:
      return { ...state, likeProducts: action.payload };
    case ProductActionTypes.LIKE_ALREADY:
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_CART:
      return { ...state, cartList: action.payload };
    default:
      return state;
  }
};

export const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_LIKES:
      return { ...state, likesList: action.payload };
    default:
      return state;
  }
};

export const setOrderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };
    default:
      return state;
  }
};
