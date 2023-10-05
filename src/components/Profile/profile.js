/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import style from './profile.module.scss';

function Profile() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const user = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    try {
      const userData = {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          image: data.image,
        },
      };

      const response = await axios.put('https://blog.kata.academy/api/user', userData, {
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
        <h3 className={style.title}>Edit profile</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`${style.username} ${style.text}`}>Username</p>
          <Controller
            name="username"
            control={control}
            defaultValue={user.username}
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  className={`${style.inputUsername} ${style.input}`}
                  placeholder="Username"
                />
                <p className={`${style.invalidText}`}>
                  {errors.username && errors.username.message}
                </p>
              </>
            )}
          />

          <p className={`${style.email} ${style.text}`}>Email address</p>
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  className={`${style.inputEmail} ${style.input}`}
                  placeholder="Email address"
                />
                <p className={`${style.invalidText}`}>
                  {errors.email && errors.email.message}
                </p>
              </>
            )}
          />

          <p className={`${style.password} ${style.text}`}>New password</p>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be at most 40 characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input.Password
                  {...field}
                  className={`${style.inputPassword} ${style.input}`}
                  placeholder="New password"
                />
                <p className={`${style.invalidText}`}>
                  {errors.password && errors.password.message}
                </p>
              </>
            )}
          />

          <p className={`${style.avatar} ${style.text}`}>Avatar image (url)</p>
          <Controller
            name="image"
            control={control}
            defaultValue={user.image}
            rules={{
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Invalid URL format',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  className={`${style.inputavatar} ${style.input}`}
                  placeholder="Avatar image (url)"
                />
                <p className={`${style.invalidText}`}>
                  {errors.avatar && errors.avatar.message}
                </p>
              </>
            )}
          />

          <Button className={style.btnSave} type="primary" htmlType="submit">
            Save
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Profile;