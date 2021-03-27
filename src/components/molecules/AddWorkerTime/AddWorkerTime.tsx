import * as React from 'react';
import { Button, Form, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'estafette';
import { useParams } from 'estafette-router';
import { objectApi } from 'api/objectApi/objectApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { Loader } from 'components/atoms/Loader/Loader';

import './AddWorkerTime.scss';

export const AddWorkerTime = () => {
  const { objectId } = useParams<any>();
  const {
    request: requestUserList,
    data: dataUserList,
    loading: loadingDataUserList
  } = useRequest<any>();
  const { request: requestAddTime, loading: loadingAddTime } = useRequest();

  const [workerListOptions, setWorkerListOptions] = React.useState<any>();

  React.useEffect(() => {
    if (objectId) {
      requestUserList(objectApi.getObject.action(objectId));
    }
  }, [objectId]);

  React.useEffect(() => {
    if (dataUserList.executors) {
      setWorkerListOptions(
        dataUserList.executors.map((item: any) => ({
          label: item.user,
          value: item.id
        }))
      );
    }
  }, [dataUserList]);

  console.log(dataUserList);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);

    // const params = {
    //   user:values.object.object_worker_time[0].name,
    //   hours:values.object.object_worker_time[0].hour.toString(),
    // }

    // requestAddTime(objectApi.addWorkerTimeOnObject.action(params, objectId));
  };

  return (
    <div className="worker-time-container">
      <AdminMenu />
      {loadingDataUserList ? (
        <Loader />
      ) : (
        <>
          <h1>Выставить время на объекте</h1>
          <Form onFinish={onFinish} className="form-add-time">
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
                loading={loadingAddTime}
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};
