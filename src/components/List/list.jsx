import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin } from 'antd';

import style from './list.module.scss';
import './list.scss';

import Article from '../Article';
import { fetchArticles } from '../../actions';

function List() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const articles = useSelector((state) => state.articles);
  const loading = useSelector((state) => state.loading);

  const displayArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articles.slice(startIndex, endIndex);
  };

  const handlePage = (page) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser ? storedUser.token : null;
    dispatch(fetchArticles(token));
    setCurrentPage(page);
  };

  return (
    <section className={style.container}>
      {loading ? (
        <Spin className={style.spin} />
      ) : (
        <>
          {displayArticles().map((article) => (
            <Article key={article.slug} article={article} />
          ))}
          <Pagination
            className={style.pagination}
            defaultCurrent={1}
            current={currentPage}
            total={articles.length}
            pageSize={articlesPerPage}
            showSizeChanger={false}
            onChange={(page) => handlePage(page)}
          />
        </>
      )}
    </section>
  );
}

export default List;
