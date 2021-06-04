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

// redux-thunk
// 1. dispatch 액션을 디스패치할 수 있고
// 2. getState를 사용하여 현재 상태를 조회할 수 있다.

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

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

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
  };

  // Request Body
  const body = { username, password };

  axios
    .post(
      'http://elice-kdt-ai-track-vm-ai-22.koreacentral.cloudapp.azure.com/rest-auth/login/',
      body,
      config,
    )
    .then((res) => {
      console.log('OK');
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Register User
export const register =
  ({ id, email, password1, password2 }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    };

    // Request Body
    const body = JSON.stringify({ username: id, email, password1, password2 });
    console.log(body);

    axios
      .post(
        'http://elice-kdt-ai-track-vm-ai-22.koreacentral.cloudapp.azure.com/rest-auth/registration/',
        body,
        config,
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  // axios
  //   .post('/rest-auth/logout', null, tokenConfig(getState))
  //   .then((res) => {
  dispatch({ type: CLEAR_USER });
  dispatch({ type: LOGOUT_SUCCESS });
  // })
  // .catch((err) => console.log(err));
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
