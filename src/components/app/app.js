/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import style from './app.module.scss';

import Header from '../Header';
import List from '../List';
import ArticleBody from '../ArticleBody';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';

import { fetchArticles, login } from '../../actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <header>
        <Header />
      </header>
      <main className={style.main}>
        <Routes>
          <Route
            path="/"
            element={<List />}
            exact
          />
          <Route
            path="/articles"
            element={<List />}
            exact
          />
          <Route
            path="/articles/:slug"
            element={<ArticleBody />}
            exact
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
            exact
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
            exact
          />
          <Route
            path="/profile"
            element={<Profile />}
            exact
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
