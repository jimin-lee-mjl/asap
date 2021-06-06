import { combineReducers } from 'redux';
import auth from './auth';
import mypage from './mypage';
import {
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
  showModalReducer,
} from './productsReducer';

const rootReducer = combineReducers({
  auth,
  mypage,
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
  showModalReducer,
});

export default rootReducer;
