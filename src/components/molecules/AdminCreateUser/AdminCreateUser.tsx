import * as React from 'react';
import { Form, Input, Button, Radio, Switch } from 'antd';
import { useRequest } from 'estafette';
import { userListApi } from 'api/userListApi/userListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './AdminCreateUser.scss';

interface Form {
  hour_tax: number;
  password: string;
  salary_hour: boolean;
  salary_percent: boolean;
  user_idno: string;
  user_name: string;
  user_phone: string;
  user_sex: string;
  user_value: number;
  username: string;
}
export const layout = {
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

export const AdminCreateUser = () => {
  const { request, loading } = useRequest();

  const onFinish = (values: any) => {
    console.log(values);
    if (values) {
      const params = {
        username: values.user_name,
        password: values.password,
        fullname: values.username,
        gender: values.user_sex.toUpperCase(),
        phone: values.user_phone || '',
        idnp: values.user_idno || '',
        is_admin: false,
        is_staff: values.user_value === 2 ? true : false,
        is_agent: values.salary_percent ? true : false,
        is_basic: values.user_value === 1 ? true : false,
        hour_price: values.salary_hour && values.hour_tax ? values.hour_tax : 0,
        agent_rate: values.salary_percent ? 50 : 0
      };
      request(userListApi.updateUserList.action(params));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="create-container">
      <AdminMenu />
      <h1>Создать пользователя</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: false
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="create-user-form"
      >
        <Form.Item
          label="User Account"
          name="user_name"
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
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_sex"
          label="Пол"
          rules={[
            {
              required: true,
              message: 'Please input gender type!'
            }
          ]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="IDNP"
          name="user_idno"
          rules={[
            {
              required: true,
              message: 'Please input idno!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="user_phone"
          rules={[
            {
              required: true,
              message: 'Please input phone!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_value"
          label="Уровень"
          rules={[
            {
              required: true,
              message: 'Please input user value!'
            }
          ]}
        >
          <Radio.Group>
            <Radio value={1}>Staff</Radio>
            <Radio value={2}>Manager</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="На проценте"
          name="salary_percent"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="На ставке" name="salary_hour" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Ставка час"
          name="hour_tax"
          rules={[
            {
              required: false
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="submit-button">
          <Button type="primary" htmlType="submit" loading={loading}>
            Созадть
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
