import * as React from 'react';
import {
  CreateRouter,
  Link,
  Redirect,
  useHistory,
  useParams,
  Routes
} from 'estafette-router';
import { routes } from 'router/routes';
import { ProviderContext } from 'components/context/Context';
import { Context } from 'components/context/Context';
import { Login } from 'components/molecules/Login/Login';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { UserMenu } from 'components/organisms/UserMenu/UserMenu';

import './Main.scss';

export const Main = () => {
  const { activeToken, userLogin } = React.useContext(Context);

  return (
    <ProviderContext>
      <Login />
    </ProviderContext>
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
