/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import style from './app.module.scss';

import Header from '../Header';
import List from '../List';
import ArticleBody from '../ArticleBody';
import NewArticle from '../NewArticle';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';

import { fetchArticles, login } from '../../actions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(login(storedUser));
      dispatch(fetchArticles(storedUser.token));
    } else {
      dispatch(fetchArticles());
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
            path="/new-article"
            element={
              user ? (
                <NewArticle action="create" />
              ) : (
                <Navigate to="/articles" />
              )
            }
            exact
          />
          <Route
            path="/articles/:slug/edit"
            element={
              user ? (
                <NewArticle action="edit" />
              ) : (
                <Navigate to="/articles" />
              )
            }
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
            element={
              user ? (
                <Profile />
              ) : (
                <Navigate to="/articles" />
              )
            }
            exact
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
