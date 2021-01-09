import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SalaryList } from 'molecules/SalaryList/SalaryList';
import { InventoryList } from 'molecules/InventoryList/InventoryList';
import { ObjectList } from 'molecules/ObjectList/ObjectList';
import { WerehouseList } from 'molecules/WerehouseList/WerehouseList';

import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <ul className="header-line">
            <li>Admin</li>
            <li>
              <a href="/">Список зарплат</a>
            </li>
            <li>
              <a href="/objects">Список обьектов</a>
            </li>
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
          {/* <WerehouseList /> */}
        </div>
      </div>
    </BrowserRouter>
  );
};
