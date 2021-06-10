import { UserSelectTypes } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';
import baseUrl from '../url';

const keywordApiUrl = `${baseUrl}api/keyword/`;
const recommendApiBaseUrl = `${baseUrl}recommend/`;

export const selectGender = (payload) => {
  return {
    type: UserSelectTypes.SELECT_GENDER,
    payload,
  };
};

export const selectCategories = (payload) => {
  return {
    type: UserSelectTypes.SELECT_CATEGORIES,
    payload,
  };
};

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
    'test',
    'cotton',
    'fit',
    'underwear',
    'comfortable',
    'panties',
    'beautiful',
    'guitars',
    'stunning',
    'happy',
    'shiny',
    'sexy',
    'stretchy',
    'toe',
    'boots',
    'calves',
    'cheap',
    'daughter',
    'nice',
    'sparingnly',
    'cute',
    'disney',
    'wife',
    'pug',
    'love',
    'hoops',
    'tired',
    'tiny',
    'love',
    'husband',
    'leather',
    'silver',
    'daily',
    'dainty',
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

export const categoryFilter = (category) => (dispatch) => {
  const categoryParameter = category.join(',');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get(
      baseUrl +
        'api/recommendation' +
        '?' +
        'keywords=' +
        '&' +
        'categories=' +
        categoryParameter,
      null,
      config,
    )
    .then((res) => {
      console.log('카테고리api요청결과', res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
