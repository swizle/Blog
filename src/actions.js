import axios from 'axios';

export const GET_ARTICLES = 'GET_ARTICLES';
export const SET_LOADING = 'SET_LOADING';

export const getArticles = (action) => ({
  type: GET_ARTICLES,
  payload: action,
});

export const setLoading = (action) => ({
  type: SET_LOADING,
  payload: action,
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
