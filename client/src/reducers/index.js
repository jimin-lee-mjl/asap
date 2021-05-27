import { combineReducers } from 'redux';
import auth from './auth';
import { setProductsReducer, selectProductReducer } from './productsReducer';

const rootReducer = combineReducers({
  auth,
  setProductsReducer,
  selectProductReducer,
});

export default rootReducer;
