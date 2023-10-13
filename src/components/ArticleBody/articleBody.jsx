import React from 'react';
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
    try {
      const response = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, {}, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending:', error);
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
                  icon={<HeartOutlined />}
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
