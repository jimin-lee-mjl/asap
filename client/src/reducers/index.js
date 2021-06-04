import { combineReducers } from 'redux';
import auth from './auth';
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
