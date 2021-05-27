import { combineReducers } from 'redux';
import auth from './auth';
import {
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
  setCategoryReducer,
} from './productsReducer';

const rootReducer = combineReducers({
  auth,
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
  setCategoryReducer,
});

export default rootReducer;
