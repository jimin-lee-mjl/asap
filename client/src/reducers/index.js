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
});

export default rootReducer;
