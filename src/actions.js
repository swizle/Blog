import axios from 'axios';

export const GET_ARTICLES = 'GET_ARTICLES';
export const SET_LOADING = 'SET_LOADING';
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

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchArticles = (userToken) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    if (userToken) {
      const response = await axios.get('https://blog.kata.academy/api/articles?limit=100', {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      dispatch(getArticles(response.data.articles));
      dispatch(setLoading(false));
    } else {
      const response = await axios.get('https://blog.kata.academy/api/articles?limit=100');
      dispatch(getArticles(response.data.articles));
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.error('Error fetching searchId:', error);
  }
};
