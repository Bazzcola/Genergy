import * as React from 'react';
import { Form, Input, Button, Checkbox, Radio,Switch } from 'antd';

import './AdminCreateUser.scss';

interface Form {
    password:string,
    username:string,
    remember?:boolean;
}

export const AdminCreateUser = () => {
    const [form, setForm] = React.useState<Form>({password:'', username:''});

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };

      const onFinish = (values:any) => {
        setForm(values);
      };
      console.log('Success:', form);

      const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="create-container">
            <h1>Создать пользователя</h1>
            <Form
            {...layout}
            name="basic"
            initialValues={{
            remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
            label="Имя"
            name="user_name"
            rules={[
                {
                required: true,
                message: 'Please input username!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item name="user_sex" label="Пол" rules={[
                {
                required: true,
                message: 'Please input gender type!',
                },
            ]}>
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
            label="IDNP"
            name="user_idno"
            rules={[
                {
                required: true,
                message: 'Please input idno!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Телефон"
            name="user_phone"
            rules={[
                {
                required: true,
                message: 'Please input phone!',
                },
            ]}
            >
            <Input />
            </Form.Item>
            
            <Form.Item name="user_value" label="Уровень" rules={[
                {
                required: true,
                message: 'Please input user value!',
                },
            ]}>
              <Radio.Group>
                <Radio value={1}>Staff</Radio>
                <Radio value={2}>Manager</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item  label="На проценте" name="salary_percent" valuePropName="checked">
              <Switch />
            </Form.Item>
          
              <Form.Item label="На ставке"  name="salary_hour" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item
              label="Ставка час"
              name="hour_tax"
              rules={[
                  {
                  required: false,
                  },
              ]}
              >
              <Input/>
            
              </Form.Item>
          

             <Form.Item
            label="Пароль"
            name="user_password"
            rules={[
                {
                required: true,
                message: 'Please input password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
          
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Созадть
            </Button>
            </Form.Item>
        </Form>
      </div>
    );
};

interface User {
  user_id:string,
  user_name:string,//имя
  user_value:number,// 1-user 2-staff 3-admin
  user_sex:string,// female, male
  user_phone:string,
  user_salary_value:{
    percent_tax:number | boolean,// 50%
    hour_tax:number,//20-30 лей час
  },
  user_salary:string,
  user_avans:string,
  user_objects:[
    {
      object_id:string,
      object_name:string,
    }
  ],
  user_inventory:[
    {
      inventory_id:string,
      inventory_name:string,//название инвентаря
      inventory_quantity:string,//кол-во инвентаря
    }
  ],
  user_materials:[
    {
      material_id:string,
      material_name:string,//название материалов
      material_quantity:string,//кол-во материалов
    }
  ]
}
           