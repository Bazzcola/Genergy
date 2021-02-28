import * as React from 'react';
import { Form, Input, Button, InputNumber, Select, Tag, Space, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './EditObject.scss';
import { RadioChangeEvent } from 'antd/lib/radio';

interface ObjectForm {
    object:{
        object_master:string;
        object_description: string,
        object_name: string,
        object_avans:number,
        object_worker_list:string[],
        object_work_list:{
            work:string,
            quantity:number,
        },
        object_material_list:{
            material:string,
            quantity:number,
        }
    }
}

export const EditObject = () => {
    const [test,setTest] = React.useState<ObjectForm>();
    const [value, setValue] = React.useState(0);
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const validateMessages = {
        required: '${label} обязательно!'
      };

    const onFinish = (values: ObjectForm) => {
        console.log('Received values of form:',values);
        setTest(values);
    };

    console.log(test)

    const workerListOptions = [{ value: 'Ваня' }, { value: 'Петя' }, { value: 'Саша' }, { value: 'Дима' }];
    
    const workerPriceListOptions = [{ value: 'Установка розетки 1' }, { value: 'Установка розетки 2' }, { value: 'Установка розетки 3' }, { value: 'Установка розетки 4' }];

    const workerRender = (props:any) => {
        const { label, closable, onClose } = props;
      
        return (
          <Tag color={'cyan'} closable={closable} onClose={onClose} style={{ marginRight: 3, marginTop: 3 }}>
            {label}
          </Tag>
        );
    }

    const onChange = (event:RadioChangeEvent) => {
        console.log('radio checked', event.target.value);
        setValue(event.target.value);
      };

    return (
        <div className="edit-object-container">
            <h1>Редактировать рабочий обьект</h1>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off" className="object-form">
                <Form.Item
                    name={['object', 'object_name']}
                    label="Название объекта"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input placeholder="Введите название объекта"/>
                </Form.Item>
                <Form.Item name={['object', 'object_description']} label="Описание объекта" rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <Input.TextArea placeholder="Введите описание объекта"/>
                </Form.Item>
                
                <Form.Item name={['object', 'object_worker_list']} label="Список работников"
                    rules={[
                    {
                        required: true,
                    },
                    ]}>
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
                <Form.List name={['object', 'object_work_list']}>
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                            {...field}
                            name={[field.name, 'work']}
                            fieldKey={[field.fieldKey, 'work']}
                            rules={[{ required: true, message: 'Название работы обязательно!' }]}
                            >
                            <Select
                                placeholder="Выберите"
                                showArrow
                                tagRender={workerRender}
                                className='select-materials'
                                options={workerPriceListOptions}
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
                                Добавить работу
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>

                <Form.List name={['object', 'object_material_list']}>
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                            {...field}
                            name={[field.name, 'material']}
                            fieldKey={[field.fieldKey, 'material']}
                            rules={[{ required: true, message: 'Название материалов обязательно!' }]}
                            >
                            <Select
                                placeholder="Выберите"
                                showArrow
                                tagRender={workerRender}
                                className='select-materials'
                                options={workerPriceListOptions}
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

                </div>
                           
                <Form.Item
                    name={['object', 'object_avans']}
                    label="Аванс"
                    rules={[
                    {
                        type: 'number',
                        required: true,
                        min: 0,
                        max: 9999999
                    },
                    ]}
                >
                    <InputNumber placeholder="Введите аванс"/>
                </Form.Item>

                <Form.Item  name={['object', 'object_discount']}
                    label="Скидка">
                <Radio.Group onChange={onChange} value={value} name="salary_percent">
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
                            Сохранить
                        </Button>
                        
                        <Button>
                            Очистить форму
                        </Button>
                    </div>
                </Form.Item>
            </Form>
      </div>
    );
};
           