import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import axios from 'axios';

import { HeartOutlined } from '@ant-design/icons';
import {
  Avatar, Tag, Button, message, Popconfirm,
} from 'antd';

import style from './articleBody.module.scss';
import { fetchArticles } from '../../actions';

function ArticleBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const article = useSelector((state) => {
    const { articles } = state;
    return articles.find((article2) => article2.slug === slug);
  });

  const onDeleteHandler = async () => {
    try {
      const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchArticles(user.token));
      navigate('/articles');
      console.log('Successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending:', error);
    }
  };

  const confirm = () => {
    onDeleteHandler();
    message.success('Article deleted');
  };

  const onClickHandler = async () => {
    if (user) {
      try {
        setIsLoading(true);
        if (article.favorited) {
          await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          });
        } else {
          await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, {}, {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          });
        }

        dispatch(fetchArticles(user.token));
        setIsLoading(false);
      } catch (error) {
        console.error('Error sending:', error);
        setIsLoading(false);
      }
    } else {
      message.error('For like pls sign in');
    }
  };

  return (
    <section className={style.mainContainer}>
      {article && (
        <div className={style.container}>
          <div className={style.container2}>
            <div className={style.header}>
              <div className={style.top}>
                <Link className={style.title} to={`/articles/${slug}`}>{article.title}</Link>
                <Button
                  icon={
                    article.favorited
                      ? (
                        <svg width="1.5em" height="1.5em" fill="#FF0000" viewBox="0 0 1024 1024">
                          <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l 23.7 15.2c10.5 6.7 24 6.7 34.5 0l 23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56 51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                        </svg>
                      )
                      : (
                        <HeartOutlined />
                      )
                  }
                  loading={isLoading}
                  onClick={onClickHandler}
                />
                <p className={style.likeCounter}>{article.favoritesCount}</p>
              </div>
              <div className={style.tagList}>
                {article.tagList.map((tag) => (
                  <Tag key={tag} className={style.tag}>{tag}</Tag>
                ))}
              </div>
              <p className={style.text}>{article.description}</p>
            </div>
            <div className={style.profile3}>
              <div className={style.profile}>
                <div className={style.profile2}>
                  <h3 className={style.name}>{article.author.username}</h3>
                  <p className={style.date}>{format(new Date(article.createdAt), 'MMMM d, yyy')}</p>
                </div>
                <Avatar className={style.icon} icon={<img src={article.author.image} alt="profile" />} />
              </div>
              {user?.username === article.author.username ? (
                <>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className={style.btnDelete}>Delete</Button>
                  </Popconfirm>
                  <Button className={style.btnEdit}><Link to={`/articles/${slug}/edit`}>Edit</Link></Button>

                </>
              ) : (<span />)}
            </div>
          </div>
          <Markdown className={style.textBody}>{article.body}</Markdown>
        </div>
      )}
    </section>
  );
}

export default ArticleBody;
