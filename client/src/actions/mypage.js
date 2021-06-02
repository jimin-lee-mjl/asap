import { SET_USERINFO } from './types';

export const userinfo = (payload) => {
  return {
    type: 'SET_USERINFO',
    payload,
  };
};
