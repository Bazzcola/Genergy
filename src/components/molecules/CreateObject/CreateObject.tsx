import * as React from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Tag,
  Space,
  Radio,
  message
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import DatePicker from 'react-datepicker';
import { objectApi } from 'api/objectApi/objectApi';
import { userListApi } from 'api/userListApi/userListApi';
import { workListApi } from 'api/workListApi/workListApi';
import { materialListApi } from 'api/materialListApi/materialListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './CreateObject.scss';
import 'react-datepicker/dist/react-datepicker.css';

export const workerRender = (props: any) => {
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

export const validateMessages = {
  required: '${label} обязательно!'
};

export const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

export const success = () => {
  message.success({
    content: 'Объект создался!',
    className: 'create-object-message'
  });
};

export const CreateObject = () => {
  const { push } = useHistory();
  const { request, loading } = useRequest();
  const { request: requestProfile, data: dataProfile } = useRequest<any>();
  const { request: requestWorkList, data: dataWorkList } = useRequest<any>();
  const { request: requestMaterialList, data: dataMaterialList } = useRequest<
    any
  >();
  const { request: requestUsersList, data: dataUsersList } = useRequest<any>();
  const dateFormat = require('dateformat');

  const [value, setValue] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const [workList, setWorkList] = React.useState<any>([]);
  const [materialList, setMaterialList] = React.useState<any>([]);
  const [usersList, setUsersList] = React.useState<any>([]);
  const [startDate, setStartDate] = React.useState<any>(new Date());

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    if (
      dataWorkList.results &&
      dataMaterialList.results &&
      dataUsersList.results
    ) {
      setWorkList(
        dataWorkList.results.map((item: any) => ({
          value: item.id,
          label: item.title
        }))
      );
      setMaterialList(
        dataMaterialList.results.map((item: any) => ({
          value: item.id,
          label: item.title
        }))
      );
      setUsersList(
        dataUsersList.results.map((item: any) => ({
          value: item.id,
          label: item.fullname
        }))
      );
    }
  }, [dataWorkList, dataMaterialList, dataUsersList]);

  const fetch = () => {
    requestProfile(userListApi.getUserProfile.action({}));
    requestWorkList(workListApi.getWorkList.action(''));
    requestMaterialList(materialListApi.getMaterialList.action({}));
    requestUsersList(userListApi.getUserList.action(''));
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);

    const keys = values.object.executors.map((item: any) => ({ user: item }));
    const endDate = dateFormat(startDate, 'yyyy-mm-dd hh:mm:ss');

    const params = {
      date_ending: endDate,
      exercises: values.object.exercises,
      executors: keys,
      materials: values.object.materials,
      title: values.object.title,
      state: !hold ? 'OPEN' : 'HOLD',
      prepaid: values.object.prepaid,
      discount: values.object.discount,
      owner: dataProfile.id
    };

    request(objectApi.createObject.action(params));

    success();
    push('CurrentObjectPage');
  };

  const onHoldingObject = () => {
    setHold((prev) => !prev);
  };

  return (
    <div className="create-object-container">
      <AdminMenu />
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
          name={['object', 'title']}
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
          name={['object', 'object_date_end']}
          label="Дата конца работы"
          rules={[
            {
              required: true
            }
          ]}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="data-picker"
          />
        </Form.Item>

        <Form.Item
          name={['object', 'executors']}
          key={'count'}
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
            options={usersList}
          />
        </Form.Item>

        <div className="add-inputs">
          <Form.List name={['object', 'exercises']}>
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
                        options={workList}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'count']}
                      fieldKey={[field.fieldKey, 'count']}
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

          <Form.List name={['object', 'materials']}>
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
                      name={[field.name, 'item']}
                      fieldKey={[field.fieldKey, 'item']}
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
                        options={materialList}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'count']}
                      fieldKey={[field.fieldKey, 'count']}
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
          name={['object', 'prepaid']}
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
        <Form.Item
          className="radio-percent"
          name={['object', 'discount']}
          label="Скидка"
        >
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
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="object-submit-btn"
            >
              Создать
            </Button>
            <Button onClick={onHoldingObject} danger={hold}>
              {hold ? 'Объект в ожидании' : 'Добавить в ожидание'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
