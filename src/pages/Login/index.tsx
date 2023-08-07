import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginImage from '@assets/images/games_login.webp';
import { useAuth } from '@services/authentication/useAuth';
import useNotification from '@hooks/useNotification';
import { setUser } from '@features/userSlice';
import { useCallback, useEffect } from 'react';
import styles from './Login.module.scss';
import type { LoginType } from './types';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextHolder, info } = useNotification('auth');
  const { signUpMutation, logInResponse, error } = useAuth();

  const onFinish = useCallback(
    (values: LoginType) => {
      signUpMutation({
        email: values.email,
        password: values.password,
      });
    },
    [signUpMutation]
  );

  useEffect(() => {
    if (logInResponse?.data?.data?.token) {
      localStorage.setItem('token', logInResponse?.data.data.token);
      dispatch(setUser(logInResponse?.data.data.user));
      navigate('/user-profile/overview');
    }

    if (error?.response?.data?.message) {
      info(error?.response?.data?.message);
    }
  }, [
    dispatch,
    error?.response?.data?.message,
    info,
    logInResponse?.data.data.token,
    logInResponse?.data.data.user,
    navigate,
  ]);

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginBox}>
          <div className={styles.illustrationWrapper}>
            <img src={LoginImage} alt="Login" />
          </div>
          <Form
            name={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <p className={styles.formTitle}>Welcome back</p>
            <p>Login to the your profile</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter valid email!' },
              ]}
            >
              <Input
                placeholder="Email"
                data-testid="email-test"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                data-testid="password-test"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                LOGIN
              </Button>
            </Form.Item>
            <Link to="/register">Need an account?</Link>
          </Form>
        </div>
      </div>
      {contextHolder}
    </>
  );
}

export default Login;
