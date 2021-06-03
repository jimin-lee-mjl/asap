import { combineReducers } from 'redux';
import auth from './auth';
import {
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
} from './productsReducer';

const rootReducer = combineReducers({
  auth,
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
  setCategoryReducer,
  cartReducer,
  likesReducer,
  setOrderDetailsReducer,
});

export default rootReducer;
