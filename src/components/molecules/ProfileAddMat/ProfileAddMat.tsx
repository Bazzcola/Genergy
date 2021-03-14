import * as React from 'react';
import { Form, Button, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'estafette';
import { useParams } from 'estafette-router';
import { userListApi } from 'api/userListApi/userListApi';
import { materialListApi } from 'api/materialListApi/materialListApi';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';
import { werehouseApi } from 'api/werehouseApi/werehouseApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './ProfileAddMat.scss';

export const ProfileAddMat = () => {
  const { userId } = useParams<any>();
  const { request, data, loading } = useRequest<any>({ data: {} });
  const { request: requestInventory, data: dataInventory } = useRequest<any>();
  const { request: requestMaterial, data: dataMaterial } = useRequest<any>();

  React.useEffect(() => {
    if (userId) {
      requestInventory(instrumentListApi.getInstrumentList.action({}));
      requestMaterial(materialListApi.getMaterialList.action({}));
      onFetch();
    }
  }, [userId]);

  console.log(dataInventory.results, 'inventoryList');
  console.log(dataMaterial.results, 'materialList');

  const onFetch = () => {
    request(userListApi.getUserById.action(userId));
  };

  const onFinish = (values: any) => {
    console.log(values, 'values');
  };

  const materialList = React.useMemo(
    () =>
      dataMaterial.results
        ? dataMaterial.results.map((item: { title: any; id: any }) => ({
            value: item.id,
            label: item.title
          }))
        : [],
    [dataMaterial.results]
  );

  const inventoryList = React.useMemo(
    () =>
      dataInventory.results
        ? dataInventory.results.map((item: { title: any; id: any }) => ({
            value: item.id,
            label: item.title
          }))
        : [],
    [dataInventory.results]
  );

  return (
    <div className="add-mat-container">
      <AdminMenu />
      {data && (
        <div className="user-info">
          <h1>Профиль работника</h1>
          <ul>
            <li>User name: {data.fullname}</li>
            <li>IDNP: {data.idnp}</li>
            <li>Phone: {data.phone}</li>
          </ul>
        </div>
      )}

      <Form
        name="nest-messages"
        onFinish={onFinish}
        autoComplete="off"
        className="add-form"
      >
        <Form.List name={['user', 'user_profile_material']}>
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
                      className="profile-select"
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
                  Добавить материалы
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name={['user', 'user_profile_inventory']}>
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
                    name={[field.name, 'inventory']}
                    fieldKey={[field.fieldKey, 'inventory']}
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
                      className="profile-select"
                      options={inventoryList}
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
                  Добавить инвентаря
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-submit-btn">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
