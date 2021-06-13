import { UserSelectTypes } from '../actions/types';

const initialState = {
  selectedGender: '',
  selectedCategories: [],
  keywords: [],
  selectedKeywords: [],
  recommend: {},
};

export default function userSelect(state = initialState, action) {
  switch (action.type) {
    case UserSelectTypes.SELECT_GENDER:
      return { ...state, selectedGender: action.payload };
    case UserSelectTypes.SELECT_CATEGORIES:
      return { ...state, selectedCategories: action.payload };
    case UserSelectTypes.SET_KEYWORDS:
      return { ...state, keywords: action.payload };
    case UserSelectTypes.SELECT_KEYWORDS:
      return { ...state, selectedKeywords: action.payload };
    case UserSelectTypes.UNSELECT_KEYWORDS:
      return { ...state, selectedKeywords: action.payload };
    case UserSelectTypes.SET_RECOMMEND:
      return { ...state, recommend: action.payload };
    default:
      return state;
  }
}
