import { combineReducers } from 'redux';
import auth from './auth';
import mypage from './mypage';
import userSelect from './userSelect';
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
  userSelect,
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
