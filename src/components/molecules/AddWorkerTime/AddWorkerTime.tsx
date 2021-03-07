import React from 'react';
import { Button, Form, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './AddWorkerTime.scss';

export const AddWorkerTime = () => {
  const workerListOptions = [
    { value: 'Ваня' },
    { value: 'Петя' },
    { value: 'Саша' },
    { value: 'Дима' }
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <div className="worker-time-container">
      <AdminMenu />
      <h1>Выставить время на объекте</h1>
      <Form onFinish={onFinish}>
        <Form.List name={['object', 'object_worker_time']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[
                      {
                        required: true,
                        message: 'Название работы обязательно!'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Выберите"
                      showArrow
                      className="time-select"
                      options={workerListOptions}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'hour']}
                    fieldKey={[field.fieldKey, 'hour']}
                    rules={[
                      {
                        required: true,
                        message: 'Количество не меньше 0',
                        min: 0,
                        max: 999,
                        type: 'number'
                      }
                    ]}
                  >
                    <InputNumber placeholder="кол-во" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить время работнику
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
  );
};
