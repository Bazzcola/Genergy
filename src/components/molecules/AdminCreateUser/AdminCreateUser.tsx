import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './AdminCreateUser.scss';

interface Form {
    password:string,
    username:string,
    remember?:boolean;
}

export const AdminCreateUser = () => {
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

    return (
        <div className="create-container">
            <h1>Создать пользователя</h1>
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
            <Checkbox>Запомнить пароль</Checkbox>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Созадть
            </Button>
            </Form.Item>
        </Form>
      </div>
    );
};
           