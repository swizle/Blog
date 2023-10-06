/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { Input, Button } from 'antd';

import style from './createArticle.module.scss';

function CreateArticle() {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user);
  const [tags, setTags] = useState([{ id: 0, value: '' }]);

  const onSubmit = async (data) => {
    try {
      const articleData = {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: tags.map((tag) => tag.value),
        },
      };

      const response = await axios.post('https://blog.kata.academy/api/articles', articleData, {
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

  const handleAddTag = () => {
    const newTag = { id: tags.length, value: '' };
    setTags([...tags, newTag]);
  };

  const handleDeleteTag = (id) => {
    const updatedTags = [...tags];
    updatedTags.splice(id, 1);
    setTags(updatedTags);
    console.log(tags.map((tag) => tag.value));
  };

  const handleUpdateTag = (id, value) => {
    const updatedTags = [...tags];

    updatedTags[id].value = value;
    setTags(updatedTags);

    console.log(tags.map((tag) => tag.value));
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>Create new article</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`${style.titleArticle} ${style.text}`}>Title</p>
          <Controller
            name="title"
            control={control}
            defaultValue=""
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
                <Input {...field} className={`${style.inputTitle} ${style.input}`} placeholder="Title" />
                <p className={`${style.invalidText}`}>{errors.title && errors.title.message}</p>
              </>
            )}
          />

          <p className={`${style.email} ${style.text}`}>Short description</p>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: 'Short description is required',
            }}
            render={({ field }) => (
              <>
                <Input {...field} className={`${style.inputDescription} ${style.input}`} placeholder="Short description" />
                <p className={`${style.invalidText}`}>{errors.description && errors.description.message}</p>
              </>
            )}
          />

          <p className={`${style.text}`}>Text</p>
          <Controller
            name="body"
            control={control}
            defaultValue=""
            rules={{
              required: 'Text is required',
            }}
            render={({ field }) => (
              <>
                <Input {...field} className={`${style.inputBody} ${style.input}`} placeholder="Text" />
                <p className={`${style.invalidText}`}>{errors.body && errors.body.message}</p>
              </>
            )}
          />

          <p className={`${style.tags} ${style.text}`}>Tags</p>
          {tags.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={style.tagContainer}>
              <Controller
                name={`tags[${index}]`}
                control={control}
                defaultValue=""
                rules={{
                  required: 'Tag is required',
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      className={`${style.inputTag} ${style.input}`}
                      placeholder="Tag"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateTag(index, e.target.value);
                      }}
                    />
                    <Button
                      className={style.btnDelete}
                      onClick={() => handleDeleteTag(index)}
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

          <Button className={style.btnSend} type="primary" htmlType="submit">Send</Button>
        </form>
      </div>
    </section>
  );
}

export default CreateArticle;
