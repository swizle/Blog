/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import style from './signIn.module.scss';

import { login, fetchArticles } from '../../actions';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios.post('https://blog.kata.academy/api/users/login', {
      user: {
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        dispatch(login(response.data.user));
        dispatch(fetchArticles(response.data.user.token));
        setIsLoading(false);
        navigate('/articles');
      })
      .catch((error) => {
        console.error('Ошибка входа', error);
      });
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>Sign In</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`${style.email} ${style.text}`}>Email address</p>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <>
                <Input {...field} className={`${style.inputEmail} ${style.input}`} placeholder="Email address" />
                {errors.email && <p className={`${style.invalidText}`}>{errors.email && errors.email.message}</p>}
              </>
            )}
          />

          <p className={`${style.password} ${style.text}`}>Password</p>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Input.Password {...field} className={`${style.inputPassword} ${style.input}`} placeholder="Password" />
                {errors.password && <p className={`${style.invalidText}`}>Password is required</p>}
              </>
            )}
          />

          <Button className={style.btnLogin} type="primary" htmlType="submit" loading={isLoading}>Login</Button>
        </form>

        <p className={style.dontHaveAcc}>
          Dont have an account?
          <Link className={style.link} to="/sign-up"> Sign Up.</Link>
        </p>
      </div>
    </section>
  );
}

export default SignIn;
