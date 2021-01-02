import * as React from 'react';
import { SalaryList } from 'molecules/SalaryList/SalaryList';

import './App.scss';

export const App = () => {
  return (
    <div className="container">
      <div className="header">
        <ul className="header-line">
          <li>Admin</li>
          <li>Список зарплат</li>
          <li>Список обьектов</li>
          <li>Список персонала</li>
          <li>Склад</li>
          <li>Создать обьект</li>
          <li>Создать пользователя</li>
        </ul>
      </div>
      <div className="content">
        <SalaryList />
      </div>
    </div>
  );
};
