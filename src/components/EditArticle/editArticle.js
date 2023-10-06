/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { Input, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

import style from './editArticle.module.scss';

function EditArticle() {
  const {
    control, handleSubmit, formState: { errors }, getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      };

      const response = await axios.post('https://blog.kata.academy/api/users', userData, {
        headers: {
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
        <h3 className={style.title}>Create new account</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`${style.username} ${style.text}`}>Username</p>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input {...field} className={`${style.inputUsername} ${style.input}`} placeholder="Username" />
                <p className={`${style.invalidText}`}>{errors.username && errors.username.message}</p>
              </>
            )}
          />

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
                <p className={`${style.invalidText}`}>{errors.email && errors.email.message}</p>
              </>
            )}
          />

          <p className={`${style.password} ${style.text}`}>Password</p>
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
                <Input.Password {...field} className={`${style.inputPassword} ${style.input}`} placeholder="Password" />
                <p className={`${style.invalidText}`}>{errors.password && errors.password.message}</p>
              </>
            )}
          />

          <p className={`${style.repPassword} ${style.text}`}>Repeat password</p>
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Repeat password is required',
              validate: (value) => value === getValues('password') || 'Passwords must match',
            }}
            render={({ field }) => (
              <>
                <Input.Password {...field} className={`${style.inputRepPassword} ${style.input}`} placeholder="Repeat password" />
                <p className={`${style.invalidText}`}>{errors.repeatPassword && errors.repeatPassword.message}</p>
              </>
            )}
          />

          <div className={style.rectangle} />
          <Controller
            name="agreement"
            control={control}
            defaultValue={false}
            rules={{ required: 'You must agree to the processing of your personal information' }}
            render={({ field }) => (
              <>
                <p className={style.agreeInfo}>
                  <Checkbox {...field} />
                  {' '}
                  I agree to the processing of my personal
                  information.
                </p>
                <p className={`${style.invalidText}`}>{errors.agreement && errors.agreement.message}</p>
              </>
            )}
          />

          <Button className={style.btnCreate} type="primary" htmlType="submit">Create</Button>
        </form>

        <p className={style.alreadyHaveAcc}>
          Already have an account?
          <Link className={style.link} to="/sign-in"> Sign In.</Link>
        </p>
      </div>
    </section>
  );
}

export default EditArticle;
