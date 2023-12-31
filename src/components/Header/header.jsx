import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import style from './header.module.scss';
import { logout, fetchArticles } from '../../actions';

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(fetchArticles());
    navigate('/articles');
  };

  return (
    <section className={style.header}>
      <Link className={style.btnMain} to="/articles">
        Realworld Blog
      </Link>
      <div className={style.btns}>
        {user ? (
          <div className={style.profile}>
            <Button className={style.btnCreate}>
              <Link to="/new-article">Create article</Link>
            </Button>
            <Link className={style.name} to="/profile">
              {user.username}
            </Link>
            <Avatar className={style.icon} icon={<img src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt="profile" />} />
            <Button className={style.btnLogOut} onClick={handleLogout}>
              <Link to="/">Log Out</Link>
            </Button>
          </div>
        ) : (
          <>
            <Button className={style.btnSignIn} type="link">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button className={style.btnSignUp}>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

export default Header;
