import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import {inventoryList} from 'api/inventoryList';

import './WorkList.scss';

export const WorkList = () => {
  const { request, data, loading, errors } = useRequest();
  useEffect(() => {
    request(inventoryList.getInventoryList({}));
    // request(inventoryList.getInventoryList(`http://localhost:8000/inventory/instrument/`));
    
  },[])

  console.log(data)

  const dataWorkList = [
    {
      name: 'Замена розетки',
      quantity: 1,
      price: 100
    },
    {
      name: 'Установка лапочки LED',
      quantity: 1,
      price: 200
    },
    {
      name: 'Установка кабеля 100м',
      quantity: 1,
      price: 1000
    },
    {
      name: 'Установка шита',
      quantity: 1,
      price: 1000
    },
    {
      name: 'Установка рубильника',
      quantity: 1,
      price: 500
    }
  ];



  return (
    <div className="work-list">
      <div className="title">
        <div className="title__text">Список работ</div>
        <Button className="add-button">Добавить</Button>
      </div>
      <div className="item_list">
        {dataWorkList.map((item, index) => (
          <div className="work-item" key={index}>
            <div className="work-item__name">{item.name}</div>
            <div className="work-item__quantity">
              Колличество - {item.quantity}
            </div>
            <div className="work-item__price">Ценна - {item.price}</div>
            <div className="button-edit-work">
              <Button>Редактировать</Button>
            </div>
            <div className="button-delete-work">
              <Button>Удалить</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
