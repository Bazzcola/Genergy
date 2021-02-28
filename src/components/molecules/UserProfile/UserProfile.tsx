import React from 'react';
import { Form, Input, Button } from 'antd';

import './UserProfile.scss';

export const UserProfile = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!'
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="user-profile">
      <h1>Профиль работника</h1>
      <div className="user-profile-content">
        <div className="user-detail-form">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Вова" disabled />
            </Form.Item>
            <Form.Item
              name={['user', 'idnp']}
              label="IDNP"
              rules={[{ type: 'email' }]}
            >
              <Input placeholder="35214566985524" />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Phone">
              <Input placeholder="+069431495" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="inventory-mat-review">
          <div className="material-review">
            <span>Список материалов</span>
            <ul className="material-list">
              <li>Провод 100м х 3шт.</li>
              <li>Лампочка 100В х 10шт.</li>
              <li>Розетка х 10шт.</li>
              <li>Лампочка LED х 10шт.</li>
              <li>Провод 23с х 20шт.</li>
            </ul>
          </div>
          <div className="inventory-review">
            <span>Список инвентаря</span>
            <ul className="inventory-list">
              <li>Машина Dacia Logan x 1шт.</li>
              <li>Дрель x 1шт.</li>
              <li>Набор ключей х 1шт.</li>
              <li>Набор отверток х 1шт.</li>
              <li>Ключ разводной х 1шт.</li>
            </ul>
          </div>
          <div className="object-review">
            <span>Список обьектов</span>
            <ul className="object-list">
              <li>Ларёк - 24 час / 17лей = 600 лей</li>
              <li>Дом - 12 час / 17лей = 300 лей</li>
              <li>Кухня - 20 час / 17лей = 400 лей</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
