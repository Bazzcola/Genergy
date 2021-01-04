import * as React from 'react';
import { SalaryList } from 'molecules/SalaryList/SalaryList';
import { InventoryList } from 'molecules/InventoryList/InventoryList';
import { ObjectList } from 'molecules/ObjectList/ObjectList';
import { WerehouseList } from 'molecules/WerehouseList/WerehouseList';

import './App.scss';

export const App = () => {
  return (
    <div className="container">
      <div className="header">
        <ul className="header-line">
          <li>Admin</li>
          <li>Список зарплат</li>
          <li>Список обьектов</li>
          <li>Список инвентаря</li>
          <li>Список материалов</li>
          <li>Создать обьект</li>
          <li>Создать пользователя</li>
          <li>Список работ</li>
        </ul>
      </div>
      <div className="content">
        {/* <SalaryList /> */}
        {/* <InventoryList /> */}
        {/* <ObjectList /> */}
        <WerehouseList />
      </div>
    </div>
  );
};
