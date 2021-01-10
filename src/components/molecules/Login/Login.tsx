import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './Login.scss';

interface Form {
    password:string,
    username:string,
    remember?:boolean;
}

interface Auth {
  auth:(login:boolean, userType:string) => void;
}

export const Login = ({auth}:Auth) => {
    const [form, setForm] = React.useState<Form>({password:'', username:''});

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };

      const onFinish = (values:any) => {
        setForm(values);
      };
      console.log('Success:', form);

      const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
      };

      React.useEffect(() => {
        if(form.username.length > 4)
        auth(true, form.username)
        // eslint-disable-next-line
      },[onFinish])

    return (
        <div className="auth-container">
            <h1>Авторизация</h1>
            <Form
            {...layout}
            name="basic"
            initialValues={{
            remember: false,
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
                message: 'Please input your username!',
                },
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
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
      </div>
    );
};
           