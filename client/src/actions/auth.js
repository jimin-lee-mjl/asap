import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_USER,
} from './types';
import baseUrl from '../url';

// redux-thunk
// 1. dispatch 액션을 디스패치할 수 있고
// 2. getState를 사용하여 현재 상태를 조회할 수 있다.

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('/rest-auth/login', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// LOGIN
export const login = (username, password) => (dispatch) => {
  const body = { username, password };
  axios
    .post(baseUrl + '/rest-auth/login/', body, config)
    .then((res) => {
      console.log('OK');
      console.log('res.data', res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOGIN_FAIL,
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
        'X-CSRFToken': csrftoken,
      },
    };

    const body = JSON.stringify({ username: id, email, password1, password2 });
    console.log(body);

    axios
      .post(baseUrl + '/rest-auth/registration/', body, config)
      .then((res) => {
        console.log('res', res);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: REGISTER_FAIL });
      });
  };

// LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post(baseUrl + '/rest-auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      console.log(res.data.detail);
      dispatch({ type: CLEAR_USER });
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => console.log(err));
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
