/* eslint-disable default-param-last */
import {
  GET_ARTICLES, SET_LOADING, LOGIN, LOGOUT,
} from './actions';

const initialState = {
  articles: [],
  loading: true,
  user: null,
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

    case LOGIN:
      try {
        const serializedUserData = JSON.stringify(action.payload);
        localStorage.setItem('user', serializedUserData);
      } catch (error) {
        console.error('Error saving user data to localStorage:', error);
      }

      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      try {
        localStorage.setItem('user', null);
      } catch (error) {
        console.error('Error remove user data to localStorage:', error);
      }

      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
