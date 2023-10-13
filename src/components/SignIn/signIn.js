import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import style from './signIn.module.scss';
import { login } from '../../actions';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post('https://blog.kata.academy/api/users/login', {
        user: {
          email: data.email,
          password: data.password,
        },
      });

      dispatch(login(response.data.user));
      setIsLoading(false);
      navigate('/articles');
    } catch (error) {
      console.error('Error logging in', error);
      message.error('Login or password is incorrect');
      setIsLoading(false);
    }
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>Sign In</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <RenderInput
            name="email"
            control={control}
            label="Email address"
            placeholder="Email address"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            }}
            errors={errors}
          />

          <RenderInput
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            rules={{ required: 'Password is required' }}
            errors={errors}
            type="password"
          />

          <Button className={style.btnLogin} type="primary" htmlType="submit" loading={isLoading}>
            Login
          </Button>
        </form>

        <p className={style.dontHaveAcc}>
          Dont have an account?
          <Link className={style.link} to="/sign-up"> Sign Up.</Link>
        </p>
      </div>
    </section>
  );
}

function RenderInput({
  name, control, label, placeholder, rules, errors, type,
}) {
  return (
    <div>
      <p className={`${style.text} ${style.email}`}>{label}</p>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={`${style.input} ${name === 'password' ? style.inputPassword : style.inputEmail}`}
              placeholder={placeholder}
              type={type || 'text'}
            />
            {errors[name] && <p className={style.invalidText}>{errors[name].message}</p>}
          </>
        )}
      />
    </div>
  );
}

export default SignIn;
