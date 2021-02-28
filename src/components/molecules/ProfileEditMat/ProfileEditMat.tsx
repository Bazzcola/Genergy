import React from 'react';
import { Form, InputNumber, Button } from 'antd';

import './ProfileEditMat.scss';

export const ProfileEditMat = () => {
  const materialList = [
    { value: 'Провод' },
    { value: 'Лампочка' },
    { value: 'Шурупы' },
    { value: 'Розетка' }
  ];

  const inventoryList = [
    { value: 'Машина Dacia Logan' },
    { value: 'Дрель' },
    { value: 'Набор ключей' },
    { value: 'Набор отверток' }
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <div className="profile-edit-material">
      <div className="edit-material">
        <Form onFinish={onFinish}>
          <h1>Список материалов</h1>
          {materialList.map((item) => (
            <Form.Item
              className="material-container"
              key={item.value}
              name={['materials', `${item.value}`]}
            >
              <div className="material-item">
                <span>{item.value}</span>
                <InputNumber placeholder="кол-во" />
              </div>
            </Form.Item>
          ))}
          <h1>Список инвентаря</h1>
          {inventoryList.map((item) => (
            <Form.Item
              className="inventory-container"
              key={item.value}
              name={['materials', `${item.value}`]}
            >
              <div className="inventory-item">
                <span>{item.value}</span>
                <InputNumber placeholder="кол-во" />
              </div>
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="object-submit-btn"
            >
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
