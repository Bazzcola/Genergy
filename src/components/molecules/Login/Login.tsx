import * as React from 'react';
import cookies from 'react-cookies';
import { Form, Input, Button, Checkbox } from 'antd';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import { Context } from 'context/Context';
import { authApi } from 'api/authApi/authApi';

import './Login.scss';

interface Token {
  access: string;
  refresh: string;
}

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

export const Login = () => {
  const { request, data, loading } = useRequest<Token>({ data: {} });
  const { push } = useHistory();
  const { setUserLogin } = React.useContext(Context);

  const onRedirect = () => push('AdminPage');

  const onLogin = () => push('Login');

  const onFinish = (values: any) => {
    if (values.username.length > 4 && values.password.length > 4) {
      try {
        request(
          authApi.authLogin({
            username: values.username,
            password: values.password
          })
        );
      } catch(e) {
        console.log(e)
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  React.useEffect(() => {
    if (data.access && data.refresh) {
      setUserLogin(true);

      localStorage.setItem('userAuth', 'login_is_true');

      // const expirationDate = new Date();
      // expirationDate.setHours(expirationDate.getHours() + 3);

      cookies.save('token', data.access, {
        path: '/',
        // expires: expirationDate
      });

      // cookies.save('refresh_token', data.refresh, {
      //   path: '/'
      // });

      onRedirect();
    } else {
        onLogin();
        console.log('redirect-login')
    }
  }, [data]);

  return (
    <div className="auth-container">
      <h1>Авторизация</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: false
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
