import * as React from 'react';
import { Button } from 'antd';

import './WerehouseList.scss';

export const WerehouseList = () => {
  const dataWerehouse = [
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    },
    {
      werehouse_name: 'Провод медный 10х3см',
      werehouse_quantity: 104,
      werehouse_buy_price: 50,
      werehouse_sell_price: 35
    }
  ];
  return (
    <div className="werehouse-list">
      <div className="werehouse-list__title">
        <span>Список материалов</span>
        <Button className="add-material">Добавить</Button>
      </div>
      <div className="werehouse-list__items">
        {dataWerehouse.map((item, index) => (
          <div className="werehouse-item" key={index}>
            <div className="werehouse-item__name">{item.werehouse_name}</div>
            <div className="werehouse-item__buy-price">
              Ценна покупки - {item.werehouse_buy_price} лей.
            </div>
            <div className="werehouse-item__sell-price">
              Ценна продажи - {item.werehouse_sell_price} лей.
            </div>
            <div className="werehouse-item__quantity">
              Колличество - {item.werehouse_quantity} шт.
            </div>
            <div className="button-edit-werehouse">
              <Button>Редактировать</Button>
            </div>
            <div className="button-delete-werehouse">
              <Button>Удалить</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
