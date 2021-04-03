import React, { useEffect, useState, ReactNode } from 'react';
import { load } from 'react-cookies';
import { remove } from 'react-cookies';
import { axiosHeadersUpdater } from 'axios/axios';

export interface Props {
  logout: boolean;
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;
  userLogin: boolean | undefined;
  setUserLogin: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  refreshToken: string | undefined;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultValue = {
  logout: false,
  setLogout: () => {},
  userLogin: undefined,
  setUserLogin: () => {},
  refreshToken: undefined,
  setRefreshToken: () => {}
};

export const Context = React.createContext<Props>(defaultValue);

export const ProviderContext = (props: ProviderProps) => {
  const children = props.children;
  const [logout, setLogout] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<boolean | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (load('token')) {
      setUserLogin(true);
    }
  }, []);

  useEffect(() => {
    if (load('token')) {
      axiosHeadersUpdater();
    } else {
      remove('token', { path: '/' });
      remove('refresh_token', { path: '/' });
      setUserLogin(undefined);
      axiosHeadersUpdater();
    }
  }, [userLogin]);

  console.log(userLogin);

  return (
    <Context.Provider
      value={{
        logout,
        setLogout,
        userLogin,
        setUserLogin,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </Context.Provider>
  );
};
