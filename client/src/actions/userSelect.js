import { UserSelectTypes } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';
import baseUrl from '../url';

const keywordApiUrl = `${baseUrl}api/keyword/`;
const recommendApiBaseUrl = `${baseUrl}recommend/`;

export const setKeywords = () => (dispatch, getstate) => {
  // asap api
  // axios
  //   .get(keywordApiUrl)
  //   .then((res) => {
  //     console.log('setKeywords:', res.data);
  //     dispatch({
  //       type: UserSelectTypes.SET_KEYWORDS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Err: ', err.response);
  //   });

  // test
  const test_keyword = [
    'Outer',
    'Top',
    'Bottom',
    'Set',
    'Sports Wear',
    'Underwear',
    'Shoes',
    'Bag',
    'Accessories',
    'Outer',
    'Top',
    'Bottom',
    'Set',
    'Sports Wear',
    'Underwear',
    'Shoes',
    'Bag',
    'Accessories',
    'Outer',
    'Top',
    'Bottom',
    'Set',
    'Sports Wear',
    'Underwear',
    'Shoes',
    'Bag',
    'Accessories',
  ];
  dispatch({
    type: UserSelectTypes.SET_KEYWORDS,
    payload: test_keyword,
  });
};

export const selectKeywords = (selectedKeyword) => (dispatch, getstate) => {
  const curSelectedKeywords = getstate().userSelect.selectedKeywords;
  console.log('curSelectedKeywords:', curSelectedKeywords);

  if (curSelectedKeywords) {
    if (curSelectedKeywords.includes(selectedKeyword)) {
      const newSelectedKeywords = curSelectedKeywords.filter(
        (Keyword) => Keyword !== selectedKeyword,
      );

      dispatch({
        type: UserSelectTypes.UNSELECT_KEYWORDS,
        payload: [...newSelectedKeywords],
      });
    } else {
      dispatch({
        type: UserSelectTypes.SELECT_KEYWORDS,
        payload: [...curSelectedKeywords, selectedKeyword],
      });
    }
  } else {
    dispatch({
      type: UserSelectTypes.SELECT_KEYWORDS,
      payload: [selectedKeyword],
    });
  }

  console.log('nowState:', getstate().userSelect.selectedKeywords);
};

export const postUserSelection = () => (dispatch, getstate) => {
  const keyword = getstate().userSelect.selectedKeywords;
  const keywordParameter = keyword.join('&');
  const recommendApiUrl = recommendApiBaseUrl + keywordParameter;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // asap api
  axios
    .post(recommendApiUrl, null, config)
    .then((res) => {
      console.log('setKeywords:', res.data);
      dispatch({
        type: UserSelectTypes.SET_KEYWORDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log('Err: ', err.response);
    });
};
