import axios from 'axios';

export const GET_ARTICLES = 'GET_ARTICLES';
export const SET_LOADING = 'SET_LOADING';
export const SET_AUTHORISED = 'SET_AUTHORISED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const getArticles = (action) => ({
  type: GET_ARTICLES,
  payload: action,
});

export const setLoading = (action) => ({
  type: SET_LOADING,
  payload: action,
});

export const setAuthorised = (action) => ({
  type: SET_AUTHORISED,
  payload: action,
});

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchArticles = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('https://blog.kata.academy/api/articles?limit=100');
    dispatch(getArticles(response.data.articles));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error fetching searchId:', error);
  }
};
