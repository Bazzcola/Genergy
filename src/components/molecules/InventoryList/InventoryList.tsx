import * as React from 'react';
import { Button } from 'antd';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './InventoryList.scss';

export const InventoryList = () => {
  const dataInventory = [
    {
      name: 'Дрель',
      quantity: 10,
      price: 1000
    },
    {
      name: 'Машина Dacia Logan',
      quantity: 5,
      price: 41000
    },
    {
      name: 'Перфоратор',
      quantity: 6,
      price: 1400
    },
    {
      name: 'Дрель Ч',
      quantity: 10,
      price: 1000
    },
    {
      name: 'Дрель В',
      quantity: 10,
      price: 1000
    },
    {
      name: 'Дрель Ф',
      quantity: 10,
      price: 1000
    }
  ];

  return (
    <div className="inventory-list">
      <AdminMenu />
      <div className="title">
        <div className="title__text">Список инвентаря</div>
        <Button className="add-button">Добавить</Button>
      </div>
      <div className="item_list">
        {dataInventory.map((item, index) => (
          <div className="inventory-item" key={index}>
            <div className="inventory-item__name">{item.name}</div>
            <div className="inventory-item__quantity">
              Колличество - {item.quantity}
            </div>
            <div className="inventory-item__price">
              Ценна 1шт.- {item.price}
            </div>
            <div className="button-edit-inventory">
              <Button>Редактировать</Button>
            </div>
            <div className="button-delete-inventory">
              <Button>Удалить</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
