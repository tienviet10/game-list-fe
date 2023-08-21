import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import WelcomeImage from '@assets/images/register_welcome.webp';
import useNotification from '@hooks/useNotification';
import { useAuth } from '@services/authentication/useAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@features/userSlice';
import CustomButton from '@components/CustomButton';
import FormItem from '@components/FormItem';
import styles from './Register.module.scss';
import type { RegisterType } from './types';

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

function Register() {
  const navigate = useNavigate();
  const { contextHolder, info } = useNotification('auth');
  const { signUpMutation, signUpResponse, signUpError } = useAuth();
  const dispatch = useDispatch();

  const onFinish = (values: RegisterType) => {
    signUpMutation({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (signUpResponse?.data?.data?.token) {
      localStorage.setItem('token', signUpResponse?.data.data.token);
      dispatch(setUser(signUpResponse?.data.data.user));
      navigate('/user-profile/overview');
    }

    if (signUpError?.response?.data?.message) {
      info(signUpError?.response?.data?.message);
    }
  }, [
    dispatch,
    info,
    navigate,
    signUpError?.response?.data?.message,
    signUpResponse?.data.data.token,
    signUpResponse?.data.data.user,
  ]);

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.registerBox}>
          <Form
            name={styles.registerForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <p className={styles.formTitle}>Register</p>
            <p>Please fill in the form below</p>

            <FormItem<FieldType, 'username'>
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true,
                },
              ]}
              placeholder="Username"
              data-testid="user-test"
            />

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
                {
                  min: 8,
                  message: 'Password must be at least 8 characters long',
                },
              ]}
              placeholder="Password"
              data-testid="password-test"
            />

            <FormItem<FieldType, 'password_confirmation'>
              name="password_confirmation"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
              placeholder="Password Confirmation"
              data-testid="password-confirmation-test"
            />

            <CustomButton
              text="REGISTER"
              buttonType="primary"
              buttonStyle={styles.registerFormButton}
              textSize="mediumMd"
              textStyle={styles.buttonTextStyle}
              htmlType="submit"
            />

            <Link to="/login">Already have an account!</Link>
          </Form>
          <div className={styles.illustrationWrapper}>
            <img src={WelcomeImage} alt="Register" />
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
}

export default Register;
