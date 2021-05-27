import { ProductActionTypes } from './types';
import axios from 'axios';
import ProductCardGroups from '../components/Recommend/productCardGroups';

export const setProducts = () => (dispatch, getstate) => {
  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      const newData = {
        outer: [],
        top: [],
        bottom: [],
      };

      console.log(res.data);
      res.data.map((data) => {
        if (data.category == 'jewelery') {
          newData.outer.push(data);
        } else if (data.category == "women's clothing") {
          newData.top.push(data);
        } else if (data.category == "men's clothing") {
          newData.bottom.push(data);
        }
      });

      console.log(newData);
      dispatch({
        type: ProductActionTypes.SET_PRODUCTS,
        payload: newData,
      });
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const selectProduct = (selectedProductId) => (dispatch, getstate) => {
  const recommendProducts = getstate().setProductsReducer.products;
  const selectedProductsState =
    getstate().selectProductReducer.selectedProducts;

  var newState = {};
  Object.entries(recommendProducts).map((products) => {
    const recommendProductList = products[1];
    recommendProductList.map((recommendProduct) => {
      if (selectedProductId == recommendProduct.id) {
        console.log('recommendProduct:', recommendProduct);
        const productCategory = recommendProduct.category;

        if (productCategory == 'jewelery') {
          newState = {
            ...selectedProductsState,
            outer: [...selectedProductsState.outer, recommendProduct],
          };
        } else if (productCategory == "women's clothing") {
          newState = {
            ...selectedProductsState,
            top: [...selectedProductsState.top, recommendProduct],
          };
        } else if (productCategory == "men's clothing") {
          newState = {
            ...selectedProductsState,
            bottom: [...selectedProductsState.bottom, recommendProduct],
          };
        }
      }
    });
  });
  console.log('newState:', newState);

  dispatch({
    type: ProductActionTypes.SELECT_PRODUCT,
    payload: newState,
  });
};
