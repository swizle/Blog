import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import style from './profile.module.scss';
import { login } from '../../actions';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(true);
      const response = await axios.put('https://blog.kata.academy/api/user', userData, {
        headers: {
          Authorization: `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch(login(response.data.user));
      setIsLoading(false);
      console.log('Successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending:', error);
      setIsLoading(false);
    }
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>Редактирование профиля</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <RenderInput
            name="username"
            control={control}
            defaultValue={user.username}
            label="Username"
            placeholder="Username"
            rules={{ required: 'Username is required' }}
            errors={errors}
          />

          <RenderInput
            name="email"
            control={control}
            defaultValue={user.email}
            label="Email address"
            placeholder="Email address"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email is required',
              },
            }}
            errors={errors}
          />

          <RenderInput
            name="password"
            control={control}
            defaultValue=""
            label="New password"
            placeholder="New password"
            rules={{
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be at least 40 characters',
              },
            }}
            errors={errors}
          />

          <RenderInput
            name="image"
            control={control}
            defaultValue={user.image}
            label="Avatar image (url)"
            placeholder="Avatar image (url)"
            rules={{
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Invalid URL format',
              },
            }}
            errors={errors}
          />

          <Button className={style.btnSave} type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </form>
      </div>
    </section>
  );
}

function RenderInput({
  name, control, defaultValue, label, placeholder, rules, errors,
}) {
  return (
    <div>
      <p className={`${style.text} ${style[name]}`}>{label}</p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={`${style.input} ${style[`input${name.charAt(0).toUpperCase()}${name.slice(1)}`]}`}
              placeholder={placeholder}
            />
            <p className={`${style.invalidText}`}>
              {errors[name] && errors[name].message}
            </p>
          </>
        )}
      />
    </div>
  );
}

export default Profile;
