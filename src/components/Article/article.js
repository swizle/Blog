/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';

import style from './article.module.scss';

function Article({ article }) {
  const {
    slug,
    title,
    description,
    createdAt,
    tagList,
    favoritesCount,
    author,
  } = article;

  return (
    <section className={style.container}>
      <div className={style.header}>
        <div className={style.top}>
          <Link className={style.title} to={`/articles/${slug}`}>{title}</Link>
          <HeartOutlined />
          <p className={style.likeCounter}>{favoritesCount}</p>
        </div>
        <div className={style.tagList}>
          {tagList.map((tag) => (
            <Tag key={tag.id} className={style.tag}>{tag}</Tag>
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
