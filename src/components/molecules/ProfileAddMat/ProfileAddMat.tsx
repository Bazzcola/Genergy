import React from 'react';
import { Form, Button, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './ProfileAddMat.scss';

export const ProfileAddMat = () => {
    
    const onFinish = (values: any) => {
        console.log('Received values of form:',values);
    };

    const materialList = [{ value: 'Провод' }, { value: 'Лампочка' }, { value: 'Шурупы' }, { value: 'Розетка' }];
    
    const inventoryList = [{ value: 'Машина Dacia Logan' }, { value: 'Дрель' }, { value: 'Набор ключей' }, { value: 'Набор отверток' }];

    return(
        <div className="add-mat-container">
            <div className="user-info">
                <h1>Профиль работника</h1>
                <ul>
                    <li>User name: Вова</li>
                    <li>IDNP: 213123123213</li>
                    <li>Phone: +655634343</li>
                </ul>
            </div>
           
            <Form name="nest-messages" onFinish={onFinish} autoComplete="off" className="add-form">
                <Form.List name={['user', 'user_profile_material']}>
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                            {...field}
                            name={[field.name, 'material']}
                            fieldKey={[field.fieldKey, 'material']}
                            rules={[{ required: true, message: 'Название работы обязательно!' }]}
                            >
                            <Select
                                placeholder="Выберите"
                                showArrow
                                className='profile-select'
                                options={materialList}
                            />
                            </Form.Item>
                            <Form.Item
                            {...field}
                            name={[field.name, 'quantity']}
                            fieldKey={[field.fieldKey, 'quantity']}
                            rules={[{ required: true, message: 'Количество не меньше 0',min: 0,
                            max: 999,type: 'number' }]}
                            >
                            <InputNumber placeholder="кол-во"/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Добавить материалы
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>

                <Form.List name={['user', 'user_profile_inventory']}>
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                            {...field}
                            name={[field.name, 'inventory']}
                            fieldKey={[field.fieldKey, 'inventory']}
                            rules={[{ required: true, message: 'Название работы обязательно!' }]}
                            >
                            <Select
                                placeholder="Выберите"
                                showArrow
                                className='profile-select'
                                options={inventoryList}
                            />
                            </Form.Item>
                            <Form.Item
                            {...field}
                            name={[field.name, 'quantity']}
                            fieldKey={[field.fieldKey, 'quantity']}
                            rules={[{ required: true, message: 'Количество не меньше 0',min: 0,
                            max: 999,type: 'number' }]}
                            >
                            <InputNumber placeholder="кол-во"/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
    )
}