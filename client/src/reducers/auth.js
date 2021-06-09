import { Auth } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  isUpdated: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case Auth.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Auth.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isUpdated: false,
        user: action.payload,
      };
    case Auth.LOGIN_SUCCESS:
    case Auth.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.key);
      return {
        ...state,
        token: action.payload.key,
        isAuthenticated: true,
        isLoading: false,
      };
    case Auth.LOGIN_FAIL:
    case Auth.LOGOUT_SUCCESS:
    case Auth.REGISTER_FAIL:
    case Auth.CLEAR_USER:
    case Auth.DELETE_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isUpdated: false,
      };
    case Auth.UPDATE_USER:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
}
