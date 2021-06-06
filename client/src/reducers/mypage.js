import { SET_USERINFO } from '../actions/types';

const initialState = {};

export default function MyPage(state = initialState, action) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
