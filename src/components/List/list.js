/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Pagination, Spin } from 'antd';
import style from './list.module.scss';
import './list.scss';

import Article from '../Article';

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const articles = useSelector((state) => state.articles);
  const loading = useSelector((state) => state.loading);

  const displayArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articles.slice(startIndex, endIndex);
  };

  const fetchArticlesFromServer = async (page) => {
    try {
      const response = await fetch(`/api/articles?page=${page}&pageSize=${articlesPerPage}`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить статьи');
      }
      const data = await response.json();
      // setArticles(data.articles);
    } catch (error) {
      console.error('Ошибка загрузки статей:', error);
    }
  };

  useEffect(() => {
    fetchArticlesFromServer(currentPage);
  }, [currentPage]);

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
            onChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </section>
  );
}

export default List;
