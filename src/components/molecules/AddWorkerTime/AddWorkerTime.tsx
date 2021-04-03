import * as React from 'react';
import { Button, Form, InputNumber, Select, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'estafette';
import { useParams, useHistory } from 'estafette-router';
import { objectApi } from 'api/objectApi/objectApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { Loader } from 'components/atoms/Loader/Loader';

import './AddWorkerTime.scss';

const success = () => {
  message.success({
    content: 'Часы добавилсь!',
    className: 'create-object-message'
  });
};

const error = () => {
  message.error({
    content: 'Часы не добавились!',
    className: 'create-object-message'
  });
};

export const AddWorkerTime = () => {
  const { push } = useHistory();
  const { objectId } = useParams<any>();
  const {
    request: requestUserList,
    data: dataUserList,
    loading: loadingDataUserList
  } = useRequest<any>();
  const { request: requestAddTime, loading: loadingAddTime, errors } = useRequest();

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
          label: item.user.fullname,
          value: item.id
        }))
      );
    }
  }, [dataUserList]);

  console.log(dataUserList);
  console.log(workerListOptions)

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    const userId = values.object.object_worker_time[0].name;
    const time = values.object.object_worker_time[0].hour.toString() ? values.object.object_worker_time[0].hour > 10 ? 
    `${values.object.object_worker_time[0].hour.toString()}:00:00` : `0${values.object.object_worker_time[0].hour.toString()}:00:00`
    : undefined;

    const params = {
      user:Number(objectId),
      hours:time,
    }

    requestAddTime(objectApi.addWorkerTimeOnObject.action(params, objectId, userId));

    !errors ? success() : error();
    !errors && push('CurrentObjectPage');
    
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
