/* eslint-disable default-param-last */
import {
  GET_ARTICLES, SET_LOADING,
} from './actions';

const initialState = {
  articles: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
