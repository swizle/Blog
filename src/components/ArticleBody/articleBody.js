/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';

import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';

import style from './articleBody.module.scss';

function ArticleBody() {
  const { slug } = useParams();

  const article = useSelector((state) => {
    const { articles } = state;

    const foundArticle = articles.find((article2) => article2.slug === slug);

    return foundArticle;
  });

  const {
    title,
    description,
    body,
    createdAt,
    tagList,
    favoritesCount,
    author,
  } = article;

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <div className={style.container2}>
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
        </div>
        <Markdown className={style.textBody}>{body}</Markdown>
      </div>
    </section>
  );
}

export default ArticleBody;
