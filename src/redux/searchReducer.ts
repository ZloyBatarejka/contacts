import { SET_SEARCH_RESULT, SEARCH } from './types';
import { IInitialSearchState, ISearchAction } from '../interfaces';
const initialState: IInitialSearchState = {
  searching: false,
  searchResult: [],
};
export default (state = initialState, action: ISearchAction) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, searching: action.payload };
    case SET_SEARCH_RESULT:
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
};
