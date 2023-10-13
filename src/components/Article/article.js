/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
        setIsLoading(false);
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
        setIsLoading(false);
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
            icon={
              article.favorited
                ? (
                  <svg width="1.5em" height="1.5em" fill="#FF0000" viewBox="0 0 1024 1024">
                    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                  </svg>
                )
                : (
                  <HeartOutlined />
                )
            }
            loading={isLoading}
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
