/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import { Button } from 'antd';
import style from './app.module.scss';

import List from '../List';
import ArticleBody from '../ArticleBody';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import { fetchArticles } from '../../actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <Router>
      <header className={style.header}>
        <Link className={style.btnMain} to="/articles">Realworld Blog</Link>
        <div className={style.btns}>
          <Button className={style.btnSignIn} type="link"><Link to="/sign-in">Sign In</Link></Button>
          <Button className={style.btnSignUp}><Link to="/sign-up">Sign Up</Link></Button>
        </div>
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
