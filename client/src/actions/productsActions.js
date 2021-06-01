import { ProductActionTypes } from './types';
import axios from 'axios';
import ProductCardGroups from '../components/Recommend/productCardGroups';

export const setProducts = () => (dispatch, getstate) => {
  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      const modalData = {};
      const productData = {
        outer: [],
        top: [],
        bottom: [],
      };
      var categoryData = [];

      console.log(res.data);
      res.data.map((data) => {
        modalData[data.id] = false;
        if (data.category == "women's clothing") {
          productData.outer.push(data);
        } else if (data.category == "men's clothing") {
          productData.top.push(data);
        } else if (data.category == 'jewelery') {
          productData.bottom.push(data);
        }
      });

      console.log(productData);
      console.log(modalData);

      Object.entries(productData).map(([category, productList]) => {
        console.log(category, productList);
        if (productList == undefined) {
        } else if (productList.length !== 0) {
          categoryData = [...categoryData, category];
        }
      });

      console.log('categoryData:', categoryData);
      dispatch({
        type: ProductActionTypes.SET_PRODUCTS,
        payload: productData,
      });
      dispatch({ type: ProductActionTypes.SET_MODAL, payload: modalData });
      dispatch({
        type: ProductActionTypes.SET_CATEGORY,
        payload: [...categoryData],
      });
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

export const selectProduct = (selectedProductId) => (dispatch, getstate) => {
  const recommendProducts = getstate().setProductsReducer.products;
  const currentSelectedProductsState =
    getstate().selectProductReducer.selectedProducts;

  var newSelectState = {};
  Object.entries(recommendProducts).map((products) => {
    const recommendProductList = products[1];
    recommendProductList.map((recommendProduct) => {
      if (selectedProductId == recommendProduct.id) {
        console.log('recommendProduct:', recommendProduct);
        const productCategory = recommendProduct.category;

        if (productCategory == "women's clothing") {
          newSelectState = {
            ...currentSelectedProductsState,
            outer: [...currentSelectedProductsState.outer, recommendProduct],
          };
        } else if (productCategory == "men's clothing") {
          newSelectState = {
            ...currentSelectedProductsState,
            top: [...currentSelectedProductsState.top, recommendProduct],
          };
        } else if (productCategory == 'jewelery') {
          newSelectState = {
            ...currentSelectedProductsState,
            bottom: [...currentSelectedProductsState.bottom, recommendProduct],
          };
        }
      }
    });
  });
  console.log('newSelectState:', newSelectState);

  dispatch({
    type: ProductActionTypes.SELECT_PRODUCT,
    payload: newSelectState,
  });
};

export const likeProduct = (likeProductId) => (dispatch, getstate) => {
  // 추가할 코드:
  // 로그인 안 한 경우, 프론트 쪽에서 미리 차단
  // 회원에 대해서만 api post

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    userId: 5,
    date: '2020 - 02 - 03',
    products: [
      { productId: 5, quantity: 1 },
      { productId: 1, quantity: 5 },
    ],
  });

  axios
    .post('https://fakestoreapi.com/carts', body, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ProductActionTypes.LIKE_ALREADY,
      });
    });

  const recommendProducts = getstate().setProductsReducer.products;
  const currentLikeProductsState = getstate().likeProductReducer.likeProducts;
  console.log('likeProductReducer:', currentLikeProductsState);

  var newLikeState = [];
  Object.entries(recommendProducts).map((products) => {
    const recommendProductList = products[1];
    recommendProductList.map((recommendProduct) => {
      if (likeProductId == recommendProduct.id) {
        newLikeState = [...currentLikeProductsState, recommendProduct];
      }
    });
  });

  console.log('newLikeState:', newLikeState);

  dispatch({
    type: ProductActionTypes.LIKE_PRODUCT,
    payload: newLikeState,
  });
};

export const controlModal = (productId, type) => (dispatch, getstate) => {
  console.log('controlModal!!!!');
  const currentModalState = getstate().setModalReducer.modals;
  console.log('currentModalState:', currentModalState);
  currentModalState[productId] = type;
  var newModalState = { ...currentModalState };
  console.log('newModalState:', newModalState);

  dispatch({
    type: ProductActionTypes.CONTROL_MODAL,
    payload: newModalState,
  });
};
