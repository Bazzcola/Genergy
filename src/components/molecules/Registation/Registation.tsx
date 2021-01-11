import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './Registration.scss';

interface Form {
    password:string,
    username:string,
    remember?:boolean;
}

export const Registation = () => {
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
        console.log('Success:', form);
      };
      console.log(form);

      const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
      };
    
    return (
        <div className="auth-container">
            <h1>Регистрация пользователя</h1>
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
           