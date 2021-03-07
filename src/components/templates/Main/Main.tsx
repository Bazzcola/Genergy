import * as React from 'react';

import { Context } from 'context/Context';
import { Login } from 'components/molecules/Login/Login';
import { SalaryList } from 'components/molecules/SalaryList/SalaryList';

import './Main.scss';

export const Main = () => {
  const { activeToken, userLogin } = React.useContext(Context);

  return (
    <>
      <Login />
      <SalaryList />
    </>
  );
};

// {showRoute ? (
//   <>
//     {activeToken ? (
//       <>
//         <AdminMenu />
//         {/* <Redirect to="/admin_menu" path="/admin_menu" /> */}
//       </>
//     ) : (
//       <>
//         <UserMenu />
//         <Redirect to="/user_menu" path="/user_menu" />
//       </>
//     )}
//   </>
// ) : (
//   <>
//     <Login />
//   </>
// )}
