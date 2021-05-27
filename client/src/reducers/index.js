import { combineReducers } from 'redux';
import auth from './auth';
import {
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
} from './productsReducer';

const rootReducer = combineReducers({
  auth,
  setProductsReducer,
  selectProductReducer,
  likeProductReducer,
  setModalReducer,
});

export default rootReducer;
