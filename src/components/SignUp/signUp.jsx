import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  Input, Checkbox, Button, message,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import style from './signUp.module.scss';
import { login } from '../../actions';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control, handleSubmit, formState: { errors }, getValues,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      const userData = {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      };

      setIsLoading(true);
      const response = await axios.post('https://blog.kata.academy/api/users', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(login(response.data.user));
      setIsLoading(false);
      navigate('/articles');
      console.log('Successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending:', error);
      message.error('Error during registration, email are username already exist');
      setIsLoading(false);
    }
  };

  return (
    <section className={style.mainContainer}>
      <div className={style.container}>
        <h3 className={style.title}>Create new account</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <RenderInput
            name="username"
            control={control}
            label="Username"
            placeholder="Username"
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
            errors={errors}
          />

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
            errors={errors}
            type="password"
          />

          <RenderInput
            name="repeatPassword"
            control={control}
            label="Repeat password"
            placeholder="Repeat password"
            rules={{
              required: 'Repeat password is required',
              validate: (value) => value === getValues('password') || 'Passwords must match',
            }}
            errors={errors}
            type="password"
          />

          <div className={style.rectangle} />

          <RenderCheckbox
            name="agreement"
            control={control}
            label="I agree to the processing of my personal information."
            rules={{ required: 'You must agree to the processing of your personal information' }}
            errors={errors}
          />

          <Button className={style.btnCreate} type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </form>

        <p className={style.alreadyHaveAcc}>
          Already have an account?
          <Link className={style.link} to="/sign-in"> Sign In.</Link>
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
      <p className={`${style.text} ${style[name]}`}>{label}</p>
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
              className={`${style.input} ${style[`input${name.charAt(0).toUpperCase()}${name.slice(1)}`]}`}
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

function RenderCheckbox({
  name, control, label, rules, errors,
}) {
  return (
    <div>
      <p className={style.agreeInfo}>
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          rules={rules}
          render={({ field }) => (
            <>
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
              />
              {' '}
              {label}
            </>
          )}
        />
      </p>
      {errors[name] && <p className={style.invalidText}>{errors[name].message}</p>}
    </div>
  );
}

export default SignUp;
