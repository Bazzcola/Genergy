import * as React from 'react';
import { Form, Input, Button, InputNumber, Select, Tag, Space, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './CreateObject.scss';

interface ObjectForm {
  object: {
    object_master: string;
    object_description: string;
    object_name: string;
    object_avans: number;
    object_worker_list: string[];
    object_work_total_list: {
      work: string;
      quantity: number;
    };
  };
}

export const CreateObject = () => {
  const [test, setTest] = React.useState<ObjectForm>();
  const [value, setValue] = React.useState(0);

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const validateMessages = {
    required: '${label} обязательно!'
  };

  const onFinish = (values: ObjectForm) => {
    console.log('Received values of form:', values);
    setTest(values);
  };

  const workerListOptions = [
    { value: 'Ваня' },
    { value: 'Петя' },
    { value: 'Саша' },
    { value: 'Дима' }
  ];

  const workerPriceListOptions = [
    { value: 'Установка розетки 1' },
    { value: 'Установка розетки 2' },
    { value: 'Установка розетки 3' },
    { value: 'Установка розетки 4' }
  ];

  const workerRender = (props: any) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        color={'cyan'}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, marginTop: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="create-object-container">
      <h1>Создать рабочий обьект</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
        className="object-form"
      >
        <Form.Item
          name={['object', 'object_name']}
          label="Название объекта"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder="Введите название объекта" />
        </Form.Item>
        <Form.Item
          name={['object', 'object_description']}
          label="Описание объекта"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input.TextArea placeholder="Введите описание объекта" />
        </Form.Item>

        <Form.Item
          name={['object', 'object_worker_list']}
          label="Список работников"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            placeholder={'Выберите работников'}
            mode="multiple"
            showArrow
            tagRender={workerRender}
            style={{ width: '100%' }}
            options={workerListOptions}
          />
        </Form.Item>

        <div className="add-inputs">
          <Form.List name={['object', 'object_work_total_list']}>
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
                      name={[field.name, 'work']}
                      fieldKey={[field.fieldKey, 'work']}
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
                        tagRender={workerRender}
                        className="select-materials"
                        options={workerPriceListOptions}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'quantity']}
                      fieldKey={[field.fieldKey, 'quantity']}
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
                    Добавить работу
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name={['object', 'object_material_total_list']}>
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
                      name={[field.name, 'material']}
                      fieldKey={[field.fieldKey, 'material']}
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
                        tagRender={workerRender}
                        className="select-materials"
                        options={workerPriceListOptions}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'quantity']}
                      fieldKey={[field.fieldKey, 'quantity']}
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
                    Добавить материалов
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        
        <Form.Item
          className="avans_field"
          name={['object', 'object_avans']}
          label="Аванс"
          rules={[
            {
              type: 'number',
              required: true,
              min: 0,
              max: 9999999
            }
          ]}
        >
          <InputNumber placeholder="Введите аванс" />
        </Form.Item>
        <Form.Item className="radio-percent" name={['object', 'percent']} label="Скидка">
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>0%</Radio>
            <Radio value={5}>5%</Radio>
            <Radio value={10}>10%</Radio>
            <Radio value={15}>15%</Radio>
            <Radio value={20}>20%</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="submit-buttons">
            <Button type="primary" htmlType="submit" className="object-submit-btn">
              Создать
            </Button>
            <Button>
              Добавить в ожидания
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
