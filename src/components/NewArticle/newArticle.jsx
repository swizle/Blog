import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { v4 } from 'uuid';

import style from './newArticle.module.scss';

import { fetchArticles } from '../../actions';

const { TextArea } = Input;

function NewArticle({ action }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control, handleSubmit, formState: { errors }, setValue,
  } = useForm();
  const { slug } = useParams();
  const user = useSelector((state) => state.user);

  const isEditForm = action === 'edit';

  const article = useSelector((state) => {
    const { articles } = state;
    const foundArticle = articles.find((article2) => article2.slug === slug);
    return foundArticle;
  });

  const [tags, setTags] = useState([]);

  const { title, description, body } = article || {};

  useEffect(() => {
    if (article && article.tagList) {
      setTags(article.tagList.map((tag) => ({ id: v4(), value: tag })));
    }
  }, [article]);

  const onSubmit = async (data) => {
    if (tags.some((tag) => !tag.value.trim())) {
      message.error('Some tags are empty');
      return;
    }

    try {
      const articleData = {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: tags.map((tag) => tag.value),
        },
      };

      const url = isEditForm ? `https://blog.kata.academy/api/articles/${slug}` : 'https://blog.kata.academy/api/articles';

      const method = isEditForm ? 'put' : 'post';

      const response = await axios[method](url, articleData, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchArticles(user.token));
      if (isEditForm) {
        navigate(`/articles/${slug}`);
      } else {
        navigate('/articles');
      }
      console.log('Successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending:', error);
    }
  };

  const handleAddTag = () => {
    const newTag = { id: v4(), value: '' };
    const updatedTags = [...tags, newTag];
    setTags([...updatedTags]);
  };

  const handleDeleteTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
    setValue(`tags[${id}]`, '');
  };

  const handleUpdateTag = (id, value) => {
    const updatedTags = [...tags];
    updatedTags[id].value = value;
    setTags(updatedTags);
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>{isEditForm ? 'Edit article' : 'Create new article'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`${style.titleArticle} ${style.text}`}>Title</p>
          <Controller
            name="title"
            control={control}
            defaultValue={title || ''}
            rules={{
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Title must be at most 20 characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={`${style.inputTitle} ${style.input}`}
                  placeholder="Title"
                />
                <p className={`${style.invalidText}`}>{errors.title && errors.title.message}</p>
              </>
            )}
          />
          <p className={`${style.email} ${style.text}`}>Short description</p>
          <Controller
            name="description"
            control={control}
            defaultValue={description || ''}
            rules={{
              required: 'Short description is required',
            }}
            render={({ field }) => (
              <>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={`${style.inputDescription} ${style.input}`}
                  placeholder="Short description"
                />
                <p className={`${style.invalidText}`}>{errors.description && errors.description.message}</p>
              </>
            )}
          />
          <p className={`${style.text}`}>Text</p>
          <Controller
            name="body"
            control={control}
            defaultValue={body || ''}
            rules={{
              required: 'Text is required',
            }}
            render={({ field }) => (
              <>
                <TextArea
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  showCount
                  maxLength={4000}
                  style={{
                    height: 200,
                    resize: 'none',
                    marginBottom: '12px',
                  }}
                  placeholder="Text"
                />
                <p className={`${style.invalidText}`}>{errors.body && errors.body.message}</p>
              </>
            )}
          />
          <p className={`${style.tags} ${style.text}`}>Tags</p>
          {tags.map((tag, index) => (
            <div key={tag.id} className={style.tagContainer}>
              <Controller
                name={tag.id}
                control={control}
                defaultValue={tag.value}
                rules={{
                  required: 'Tag is required',
                }}
                render={({ field }) => (
                  <>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      className={`${style.inputTag} ${style.input}`}
                      placeholder="Tag"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateTag(index, e.target.value);
                      }}
                    />
                    <Button
                      className={style.btnDelete}
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              />
              <p className={`${style.invalidText}`}>{errors[`tags[${index}]`] && errors[`tags[${index}]`].message}</p>
            </div>
          ))}
          <Button className={style.btnAdd} onClick={handleAddTag}>Add tag</Button>
          <Button className={style.btnSend} type="primary" htmlType="submit">
            {isEditForm ? 'Save' : 'Send'}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default NewArticle;
