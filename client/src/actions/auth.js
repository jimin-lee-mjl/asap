import axios from 'axios';
import { Auth } from './types';
import baseUrl from '../url';

// DEFAULT CONFIG
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// GET USER'S TOKEN
export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
    console.log(`Token ${token}`);
  }

  return config;
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: Auth.USER_LOADING });
  axios
    .get(baseUrl + 'api/user/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: Auth.USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// LOGIN
export const login = (username, password) => (dispatch) => {
  const body = { username, password };
  axios
    .post(baseUrl + 'rest-auth/login/', body, config)
    .then((res) => {
      console.log('OK');
      console.log('res.data', res.data);
      dispatch({
        type: Auth.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      console.log(Object.keys(err.response.data));
      const errors = Object.keys(err.response.data);
      errors.forEach((x) => {
        alert(err.response.data[x]);
      });
      dispatch({
        type: Auth.LOGIN_FAIL,
      });
    });
};

// REGIESTER
export const register =
  ({ id, email, password1, password2 }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { username: id, email, password1, password2 };
    console.log(body);

    axios
      .post(baseUrl + '/rest-auth/registration/', body, config)
      .then((res) => {
        console.log('res', res);
        dispatch({
          type: Auth.REGISTER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(Object.keys(err.response.data));
        const errors = Object.keys(err.response.data);
        errors.forEach((x) => {
          alert(err.response.data[x]);
        });
        dispatch({ type: Auth.REGISTER_FAIL });
      });
  };

// LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post(baseUrl + 'rest-auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      console.log(res.data.detail);
      dispatch({ type: Auth.CLEAR_USER });
      dispatch({ type: Auth.LOGOUT_SUCCESS });
    })
    .catch((err) => console.log(err));
};

// DELETE USER
export const deleteUser = () => (dispatch, getState) => {
  console.log('delete user action working', tokenConfig(getState));
  axios
    .delete(baseUrl + '/api/account/', tokenConfig(getState))
    .then((res) => {
      console.log('delete account', res);
      dispatch({ type: Auth.DELETE_USER });
      dispatch({ type: Auth.CLEAR_USER });
      dispatch({ type: Auth.LOGOUT_SUCCESS });
    })
    .catch((err) => console.log(err.response));
};

// CHANGE DELIVERY INFO
export const changeDelivery = (body) => (dispatch, getState) => {
  axios
    .patch(baseUrl + 'api/user/delivery/', body, tokenConfig(getState))
    .then((res) => {
      console.log('change delivery info SUCCESSED', res);
      alert('Delivery Information successfully updated.');
    })
    .catch((err) => {
      console.log(err.response);
      alert('Update failed. Please try again.');
    });
};

// CHANGE PASSWORD
export const changePassword = (body) => (dispatch, getState) => {
  axios
    .post(baseUrl + '/rest-auth/password/change/', body, tokenConfig(getState))
    .then((res) => {
      console.log('change password SUCCESSED', res);
      alert('Your password successfully changed.');
      dispatch({ type: Auth.UPDATE_USER });
    })
    .catch((err) => {
      console.log(err.response);
      console.log(Object.keys(err.response.data));
      const errors = Object.keys(err.response.data);
      errors.forEach((x) => {
        alert(err.response.data[x]);
      });
    });
};
