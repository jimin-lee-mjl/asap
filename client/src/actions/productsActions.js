import { ProductActionTypes } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';

const baseUrl = `http://elice-kdt-ai-track-vm-ai-22.koreacentral.cloudapp.azure.com/`;
const orderApiUrl = `${baseUrl}api/order/`;
const cartApiUrl = `${baseUrl}api/user/cart/`;
const likesApiUrl = `${baseUrl}api/user/like/`;

export const setProducts = () => (dispatch, getstate) => {
  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      const productData = {
        outer: [],
        top: [],
        bottom: [],
      };
      var categoryData = [];

      console.log(res.data);
      res.data.map((data) => {
        if (data.category == "women's clothing") {
          productData.outer.push(data);
        } else if (data.category == "men's clothing") {
          productData.top.push(data);
        } else if (data.category == 'jewelery') {
          productData.bottom.push(data);
        }
      });

      console.log(productData);

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
      dispatch({
        type: ProductActionTypes.SET_CATEGORY,
        payload: [...categoryData],
      });
    })
    .catch((err) => {
      console.log('Err: ', err.response);
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

export const likeProduct = (likeProduct) => (dispatch, getstate) => {
  // asap api
  const body = JSON.stringify({
    asin: likeProduct,
  });

  axios
    .post(likesApiUrl, body, tokenConfig(getstate))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });

  const curLikesState = getstate().likeProductReducer.likeProducts;
  console.log('curLikesState:', curLikesState);
  const newLikesState = [...curLikesState, likeProduct];
  console.log('newLikesState:', newLikesState);

  dispatch({
    type: ProductActionTypes.LIKE_PRODUCT,
    payload: newLikesState,
  });
};

export const addToCart = (addCartProduct) => (dispatch, getstate) => {
  const body = JSON.stringify({
    asin: addCartProduct,
  });

  axios
    .post(cartApiUrl, body, tokenConfig(getstate))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const deleteCart = (deleteCartProduct) => (dispatch, getstate) => {
  // const body = JSON.stringify({
  //   asin: '0039487',
  // });

  // axios
  //   .delete(cartApiUrl, body, tokenConfig(getstate))
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err.response);
  //   });

  const curCartState = getstate().cartReducer.cartList;
  console.log('curLikesState:', curCartState);
  const newCartState = curCartState.filter(
    (product) => product.id !== Number(deleteCartProduct),
  );
  console.log('newCartState:', newCartState);

  dispatch({
    type: ProductActionTypes.DELETE_CART,
    payload: newCartState,
  });
};

export const showModal = (productId) => (dispatch, getstate) => {
  if (productId === 0) {
    const resetModalState = {
      key: '',
      data: {},
    };
    dispatch({
      type: ProductActionTypes.RESET_MODAL,
      payload: resetModalState,
    });
  } else {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        const newModalState = {
          key: productId,
          data: res.data,
        };
        dispatch({
          type: ProductActionTypes.SHOW_MODAL,
          payload: newModalState,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
};

// cart
export const setCart = () => (dispatch, getstate) => {
  axios
    .get(cartApiUrl, tokenConfig(getstate))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });

  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: ProductActionTypes.SET_CART,
        payload: res.data,
      });
      console.log(getstate());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

//likes
export const setLikes = () => (dispatch, getstate) => {
  axios
    .get(likesApiUrl, tokenConfig(getstate))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });

  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: ProductActionTypes.SET_LIKES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

//orderhistory
export const setOrderDetails = (orderId) => (dispatch, getstate) => {
  axios
    .get(`${orderApiUrl}${Number(orderId)}/`, tokenConfig(getstate))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });

  // fake api
  axios
    .get('https://fakestoreapi.com/products')
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ProductActionTypes.SET_ORDER_DETAILS,
        payload: res.data,
      });
      console.log(getstate());
    })
    .catch((err) => {
      console.log(err.response);
    });
};
