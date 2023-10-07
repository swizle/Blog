/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Tag, Button } from 'antd';

import style from './article.module.scss';
import { fetchArticles } from '../../actions';

function Article({ article }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    slug,
    title,
    description,
    createdAt,
    tagList,
    favoritesCount,
    author,
  } = article;

  const onClickHandler = async () => {
    try {
      if (article.favorited) {
        const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(fetchArticles(storedUser.token));
        } else {
          dispatch(fetchArticles());
        }
        navigate('/articles');
        console.log('Успешно отправлено:', response.data);
      } else {
        const response = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, {}, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(fetchArticles(storedUser.token));
        } else {
          dispatch(fetchArticles());
        }
        navigate('/articles');
        console.log('Успешно отправлено:', response.data);
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  return (
    <section className={style.container}>
      <div className={style.header}>
        <div className={style.top}>
          <Link className={style.title} to={`/articles/${slug}`}>{title}</Link>
          <Button
            icon={<HeartOutlined />}
            onClick={onClickHandler}
          />
          <p className={style.likeCounter}>{favoritesCount}</p>
        </div>
        <div className={style.tagList}>
          {tagList.map((tag) => (
            <Tag key={tag} className={style.tag}>{tag}</Tag>
          ))}
        </div>
        <p className={style.text}>{description}</p>
      </div>
      <div className={style.profile}>
        <div className={style.profile2}>
          <h3 className={style.name}>{author.username}</h3>
          <p className={style.date}>{format(new Date(createdAt), 'MMMM d, yyy')}</p>
        </div>
        <Avatar className={style.icon} icon={<img src={author.image} alt="profile" />} />
      </div>
    </section>
  );
}

export default Article;
