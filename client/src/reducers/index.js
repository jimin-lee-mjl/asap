import { combineReducers } from 'redux';
import auth from './auth';
import { setProductsReducer } from './productsReducer';

const rootReducer = combineReducers({
  auth,
  setProductsReducer,
});

export default rootReducer;
