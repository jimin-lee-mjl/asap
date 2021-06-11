import { UserSelectTypes } from './types';
import axios from 'axios';
import baseUrl from '../url';

export const test_keyword = [
  'love',
  'small',
  'great',
  'warm',
  'quality',
  'perfectly',
  'halloween',
  'disappointed',
  'cute',
  'nice',
  'large',
  'happy',
  'good',
  'fit',
  'comfortable',
  'cheap',
  'winter',
  'wedding',
  'waterproof',
  'thigh',
  'tall',
  'summer',
  'stretchy',
  'son',
  'soft',
  'sexy',
  'satisfied',
  'refund',
  'pricey',
  'perfect',
  'party',
  'ok',
  'horrible',
  'comfy',
  'awesome',
  'worth',
  'workout',
  'wish',
  'washing',
  'washed',
  'vintage',
  'uncomfortable',
  'ugly',
  'tiny',
  'tights',
  'thanks',
  'suit',
  'stage',
  'snowboarding',
  'smaller',
  'slimming',
  'short',
  'sad',
  'rain',
  'poorly',
  'poor',
  'paid',
  'ninja',
  'mountaineering',
  'metal',
  'long',
  'liked',
  'impressed',
  'gorgeous',
  'girl',
  'fraud',
  'excelente',
  'daily',
  'bien',
  'better',
  'beautiful',
];

// SELECT GENDER SAVED TO STORE
export const selectGender = (payload) => {
  return {
    type: UserSelectTypes.SELECT_GENDER,
    payload,
  };
};

// SELECT CATEGORY SAVED TO STORE
export const selectCategories = (payload) => {
  return {
    type: UserSelectTypes.SELECT_CATEGORIES,
    payload,
  };
};

// GET ALL KEYWORD
export const setKeywords = () => (dispatch, getstate) => {
  // asap api
  // axios
  //   .get(`${baseUrl}api/keyword/`)
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

  dispatch({
    type: UserSelectTypes.SET_KEYWORDS,
    payload: test_keyword.slice(0, 35),
  });
};

// SELECT KEYWORD SAVED TO STORE
export const selectKeywords = (selectedKeyword) => (dispatch, getstate) => {
  const curSelectedKeywords = getstate().userSelect.selectedKeywords;

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
};

// GET RECOMMEND PRODUCT
export const recommendFilter = (category, keyword) => (dispatch) => {
  const categoryParameter = category.join(',');
  const keywordParameter = keyword.join(',');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get(
      baseUrl +
        'api/item/recommendation' +
        '?' +
        'keywords=' +
        keywordParameter +
        '&' +
        'categories=' +
        categoryParameter,
      null,
      config,
    )
    .then((res) => {
      console.log('추천api요청결과', res.data);
      dispatch({
        type: UserSelectTypes.SET_RECOMMEND,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
