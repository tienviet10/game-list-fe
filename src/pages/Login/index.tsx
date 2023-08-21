import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginImage from '@assets/images/games_login.webp';
import { useAuth } from '@services/authentication/useAuth';
import useNotification from '@hooks/useNotification';
import { setUser } from '@features/userSlice';
import { useCallback, useEffect } from 'react';
import CustomButton from '@components/CustomButton';
import FormItem from '@components/FormItem';
import styles from './Login.module.scss';
import type { LoginType } from './types';

type FieldType = {
  email?: string;
  password?: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextHolder, info } = useNotification('auth');
  const { signInMutation, signInResponse, signInError } = useAuth();

  const onFinish = useCallback(
    (values: LoginType) => {
      signInMutation({
        email: values.email,
        password: values.password,
      });
    },
    [signInMutation]
  );

  useEffect(() => {
    if (signInResponse?.data?.data?.token) {
      localStorage.setItem('token', signInResponse?.data.data.token);
      dispatch(setUser(signInResponse?.data.data.user));
      navigate('/user-profile/overview');
    }

    if (signInError?.response?.data?.message) {
      info(signInError?.response?.data?.message);
    }
  }, [
    dispatch,
    signInError?.response?.data?.message,
    info,
    signInResponse?.data.data.token,
    signInResponse?.data.data.user,
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

            <FormItem<FieldType, 'email'>
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter valid email!' },
              ]}
              placeholder="Email"
              data-testid="email-test"
            />

            <FormItem<FieldType, 'password'>
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              placeholder="Password"
              data-testid="password-test"
            />

            <CustomButton
              text="LOGIN"
              buttonType="primary"
              buttonStyle={styles.loginFormButton}
              textSize="mediumMd"
              textStyle={styles.buttonTextStyle}
              htmlType="submit"
            />

            <Link to="/register">Need an account?</Link>
          </Form>
        </div>
      </div>
      {contextHolder}
    </>
  );
}

export default Login;
