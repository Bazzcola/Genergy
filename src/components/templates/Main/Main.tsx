import * as React from 'react';
import { Login } from 'components/molecules/Login/Login';
import { SalaryList } from 'components/molecules/SalaryList/SalaryList';

import './Main.scss';

export const Main = () => {
  return (
    <>
      <Login />
      <SalaryList />
    </>
  );
};
