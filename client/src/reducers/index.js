import { combineReducers } from 'redux';
import auth from './auth';
import mypage from './mypage';
import {
  setProductsReducer,
  selectProductReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
  showModalReducer,
  orderReducer,
} from './productsReducer';

const rootReducer = combineReducers({
  auth,
  mypage,
  setProductsReducer,
  selectProductReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
  showModalReducer,
  orderReducer,
});

export default rootReducer;
