import { axiosHeadersUpdater } from 'axios/axios';
import React, { useEffect, useState, ReactNode } from 'react';
import cookies from 'react-cookies';
import { load, save, remove } from 'react-cookies';

export interface Props {
  userLogin: boolean;
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
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
  userLogin: false,
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

  const [salaryList, setSalaryList] = useState<SalaryList[]>([]);
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  );
  const [userLogin, setUserLogin] = useState<boolean>(false);

  useEffect(() => {
    setSalaryList(dataSalaryList);
    console.log(salaryList);
  }, []);

  useEffect(() => {
    setActiveToken(cookies.load('token'));
  }, [userLogin]);

  React.useEffect(() => {
    const onSaveAccessData = async (): Promise<void> => {
      if (activeToken) {
        if (activeToken === null) {
          remove('access', { path: '/' });
          remove('pwd_token', { path: '/' });

          axiosHeadersUpdater();

        
        } else {
        

          save('access', activeToken, { path: '/' });
          // save('pwd_token', accessData.pwd_token, { path: '/' });

          axiosHeadersUpdater();

        }
      }
    };

    onSaveAccessData();
  }, [activeToken]);


  // console.log(salaryList);
  // console.log(activeToken);

  return (
    <Context.Provider
      value={{
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
