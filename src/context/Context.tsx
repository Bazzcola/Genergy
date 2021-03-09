import React, { useEffect, useState, ReactNode } from 'react';
import cookies from 'react-cookies';
import { remove } from 'react-cookies';
import { axiosHeadersUpdater } from 'axios/axios';

export interface Props {
  logout:boolean;
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;
  userLogin: boolean | undefined;
  setUserLogin: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  activeToken: string | undefined;
  setActiveToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  refreshToken: string | undefined;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  salaryList: SalaryList[];
  setSalaryList: React.Dispatch<React.SetStateAction<SalaryList[]>>;
}

export interface SalaryList {
  name: string;
  sex: string;
  phone: string;
  salary: number;
  avans: number;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultValue = {
  logout:false,
  setLogout: () => {},
  userLogin: undefined,
  setUserLogin: () => {},
  activeToken: undefined,
  setActiveToken: () => {},
  refreshToken: undefined,
  setRefreshToken: () => {},
  salaryList: [],
  setSalaryList: () => {}
};

const dataSalaryList = [
  {
    name: 'Петя',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 0
  },
  {
    name: 'Ваня',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 600
  },
  {
    name: 'Гриша',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 0
  },
  {
    name: 'Саша',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 200
  },
  {
    name: 'Дима',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 555
  },
  {
    name: 'Вася',
    sex: 'Муж.',
    phone: '079652374',
    salary: 3599,
    avans: 1000
  }
];

export const Context = React.createContext<Props>(defaultValue);

export const ProviderContext = (props: ProviderProps) => {
  const children = props.children;

  const [logout, setLogout] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<boolean | undefined>(undefined);
  const [salaryList, setSalaryList] = useState<SalaryList[]>([]);
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if(localStorage.getItem('userAuth') === 'login_is_true') {
      setUserLogin(true);
    }
    setSalaryList(dataSalaryList);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('userAuth') === 'login_is_true') {
      setActiveToken(cookies.load('token'));  
      setRefreshToken(cookies.load('refresh_token'));
      axiosHeadersUpdater();
    } else {
      setActiveToken(undefined);
      setRefreshToken(undefined);
      remove('token', { path: '/' });
      remove('refresh_token', { path: '/' });
      setUserLogin(undefined);
      axiosHeadersUpdater();
    }
  }, [userLogin]);

  console.log(userLogin)

  return (
    <Context.Provider
      value={{
        logout,
        setLogout,
        userLogin,
        setUserLogin,
        activeToken,
        setActiveToken,
        refreshToken,
        setRefreshToken,
        salaryList,
        setSalaryList
      }}
    >
      {children}
    </Context.Provider>
  );
};
