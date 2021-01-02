import * as React from 'react';

import 'molecules/InventoryList/InventoryList.scss';

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
      <div className="title">
        <div className="title__text">Список инвентаря</div>
      </div>
      <div className="item_list">
        {dataInventory.map((item, index) => (
          <div className="inventory-item" key={index}>
            <div className="inventory-item__name">{item.name}</div>
            <div className="inventory-item__quantity">
              Колличество - {item.quantity}
            </div>
            <div className="inventory-item__price">Ценна - {item.price}</div>
            <div className="button-edit-inventory">
              <button>Редактировать</button>
            </div>
            <div className="button-delete-inventory">
              <button>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
