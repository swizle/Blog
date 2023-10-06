/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import axios from 'axios';

import { HeartOutlined } from '@ant-design/icons';
import {
  Avatar, Tag, Button, message, Popconfirm,
} from 'antd';

import style from './articleBody.module.scss';

function ArticleBody() {
  const user = useSelector((state) => state.user);
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

  const onDeleteHandler = async () => {
    try {
      const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Успешно отправлено:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  const confirm = (e) => {
    console.log(e);
    onDeleteHandler();
    message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const onClickHandler = async () => {
    try {
      const response = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, {}, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Успешно отправлено:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <div className={style.container2}>
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
          <div className={style.profile3}>
            <div className={style.profile}>
              <div className={style.profile2}>
                <h3 className={style.name}>{author.username}</h3>
                <p className={style.date}>{format(new Date(createdAt), 'MMMM d, yyy')}</p>
              </div>
              <Avatar className={style.icon} icon={<img src={author.image} alt="profile" />} />
            </div>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className={style.btnDelete}>Delete</Button>
            </Popconfirm>
            <Button className={style.btnEdit}><Link to={`/articles/${slug}/edit`}>Edit</Link></Button>
          </div>
        </div>
        <Markdown className={style.textBody}>{body}</Markdown>
      </div>
    </section>
  );
}

export default ArticleBody;
