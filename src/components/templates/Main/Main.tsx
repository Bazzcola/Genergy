import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { ProviderContext } from 'components/context/Context';
import { Login } from 'components/molecules/Login/Login';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { UserMenu } from 'components/organisms/UserMenu/UserMenu';

import './Main.scss';

interface LoginForm {
  login: boolean;
  userType: string;
}

export const Main = () => {
  const [token, setToken] = React.useState<LoginForm>({
    login: false,
    userType: ''
  });

  const auth = (login: boolean, userType: string) => {
    setToken({ login: login, userType: userType });
  };

  return (
    <ProviderContext>
      <BrowserRouter>
        <AdminMenu />
        {/* {token.login ? (
          <>
            {token.userType === 'admin1' ? (
              <>
                <AdminMenu />
                <Redirect to="/admin_menu" path="/admin_menu" />
              </>
            ) : (
              <>
                <UserMenu />
                <Redirect to="/user_menu" path="/user_menu" />
              </>
            )}
          </>
        ) : (
          <>
            <Route exact path="/">
              <Redirect to="/" />
              <Login auth={auth} />
            </Route>
          </>
        )} */}
      </BrowserRouter>
    </ProviderContext>
  );
};
