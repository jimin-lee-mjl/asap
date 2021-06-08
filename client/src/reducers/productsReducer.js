import { ProductActionTypes } from '../actions/types';

// products: {
//   outer: [],
//   top: [],
//   bottom: [],
//   set: [],
//   sports: [],
//   etc: [],
//   shoes: [],
//   bag: [],
//   accessories: [],
// },
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
  category: [],
  selectedProductId: [],
  likeProducts: [],
  likesList: [],
  cartProducts: [],
  cartList: [],
  orderDetails: [],
  modal: {
    key: '',
    data: {},
  },
  orderList: [],
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
    case ProductActionTypes.SELECT_PRODUCT_ID:
      return { ...state, selectedProductId: action.payload };
    case ProductActionTypes.UNSELECT_PRODUCT:
      return { ...state, selectedProducts: action.payload };
    case ProductActionTypes.UNSELECT_PRODUCT_ID:
      return { ...state, selectedProductId: action.payload };
    default:
      return state;
  }
};

export const showModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SHOW_MODAL:
      return { ...state, modal: action.payload };
    case ProductActionTypes.RESET_MODAL:
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_CART:
      return { ...state, cartList: action.payload };
    case ProductActionTypes.DELETE_CART:
      return { ...state, cartList: action.payload };
    case ProductActionTypes.LOAD_CART:
      return { ...state, cartProducts: action.payload };
    case ProductActionTypes.ADD_TO_CART:
      return { ...state, cartProducts: action.payload };
    case ProductActionTypes.UNDO_CART:
      return { ...state, cartProducts: action.payload };
    default:
      return state;
  }
};

export const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_LIKES:
      return { ...state, likesList: action.payload };
    case ProductActionTypes.DELETE_LIKES:
      return { ...state, likesList: action.payload };
    case ProductActionTypes.LOAD_LIKES:
      return { ...state, likeProducts: action.payload };
    case ProductActionTypes.ADD_TO_LIKES:
      return { ...state, likeProducts: action.payload };
    case ProductActionTypes.UNDO_LIKES:
      return { ...state, likeProducts: action.payload };
    default:
      return state;
  }
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.ORDER_REQUEST:
      return { ...state, orderList: action.payload };
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
