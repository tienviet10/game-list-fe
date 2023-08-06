import { Button, Form, Input } from 'antd';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import WelcomeImage from '@/assets/images/register_welcome.webp';

// import useAuth from '@/services/authentication/useAuth';
// import { setUser } from '@/features/userSlice';
import type { RegisterType } from './types';

function Register() {
  // const navigate = useNavigate();
  // const { register, contextHolder, info } = useAuth();
  // const dispatch = useDispatch();

  const onFinish = async (values: RegisterType) => {
    console.log('Success:', values);
    // const registerData = await register(
    //   values.username,
    //   values.email,
    //   values.password
    // );

    // if (registerData.token) {
    //   localStorage.setItem('token', registerData.token);
    //   dispatch(setUser(registerData.user));
    //   navigate('/user-profile/overview');
    // } else {
    //   info(registerData.errors[0]);
    // }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.registerBox}>
          <Form
            name={styles.registerForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <p className={styles.formTitle}>Register</p>
            <p>Please fill in the form below</p>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Username"
                data-testid="user-test"
                className={styles.input}
              />
            </Form.Item>

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
                {
                  min: 8,
                  message: 'Password must be at least 8 characters long',
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                data-testid="password-test"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item
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
            >
              <Input.Password
                placeholder="Password Confirmation"
                data-testid="password-confirmation-test"
                className={styles.input}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.registerFormButton}
              >
                REGISTER
              </Button>
            </Form.Item>
            <Link to="/login">Already have an account!</Link>
          </Form>
          <div className={styles.illustrationWrapper}>
            <img src={WelcomeImage} alt="Register" />
          </div>
        </div>
      </div>
      {/* {contextHolder} */}
    </>
  );
}

export default Register;
