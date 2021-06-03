import { ProductActionTypes } from './types';
import axios from 'axios';

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
        console.log('Err: ', err);
      });
  }
};

// cart
export const setCart = () => (dispatch, getstate) => {
  // 이 부분 url 을 user_id/cart 이런 식으로 바뀌어야 함.
  // input: user_id
  // output: 장바구니 데이터 {asin, imageURL, title, quantity, price}
  console.log(getstate());

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
      console.log('Err: ', err);
    });
};

//likes
export const setLikes = () => (dispatch, getstate) => {
  // 이 부분 url 을 user_id/Likes 이런 식으로 바뀌어야 함.
  // input: user_id
  // output: 찜 데이터 {asin, imageURL, title, quantity, price}

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
      console.log('Err: ', err);
    });
};

//orderhistory
export const setOrderDetails = (orderId) => (dispatch, getstate) => {
  //fake api
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
      console.log('Err: ', err);
    });

  // api
  // const sampleData = {
  //   order_history_details: [
  //     {
  //       id: 3,
  //       ordered_at: '2021-05-31T10:15:48.321923Z',
  //       total_price: 50,
  //       user_id: 2,
  //       items: ['40599922', 'B0023446'],
  //     },
  //     {
  //       id: 4,
  //       ordered_at: '2021-05-31T10:21:17.013279Z',
  //       total_price: 20,
  //       user_id: 2,
  //       items: ['100045442'],
  //     },
  //   ],
  // };

  // const orderDetailsApiUrl = '/api/user/<int:user_id>/order';

  // axios
  //   .get('https://fakestoreapi.com/products')
  //   .then((res) => {
  //     console.log(res.data);
  //     const orderDetails = sampleData.order_history_details.find(
  //       (order) => order.id === Number(orderId),
  //     );
  //     console.log(orderDetails);
  //     dispatch({
  //       type: ProductActionTypes.SET_ORDER_DETAILS,
  //       payload: orderDetails,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Err: ', err);
  //   });
};
