import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from 'estafette';
import {inventoryList} from 'api/inventoryList';

import './WorkList.scss';

export const WorkList = () => {
  // const { request, data, loading, errors } = useRequest({data:{}});
  // useEffect(() => {
    // getInventory(inventoryList.getInventoryList())
    // const test = {count:2,price:222,title:'fignea'}
    // request(inventoryList.getInventoryList(`http://localhost:8000/inventory/instrument/`));
  //   fetch('http://localhost:8000/inventory/instrument/')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // },[])
// console.log(data)
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
        <button className="add-button">Добавить</button>
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
              <button>Редактировать</button>
            </div>
            <div className="button-delete-work">
              <button>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
