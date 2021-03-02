import React, { useEffect, useState, ReactNode } from 'react';
import { useRequest } from 'estafette';
import { authApi } from 'api/authApi/authApi';

export interface Props {
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
const { request, data, loading, errors } = useRequest();

  const [salaryList, setSalaryList] = useState<SalaryList[]>([]);

  const children = props.children;

  useEffect(() => {
    const login = {username: "super.user", password: "password"}
    request(authApi.authLogin(login))
  },[])

console.log(data)

  useEffect(() => {
    setSalaryList(dataSalaryList);
  }, []);

  return (
    <Context.Provider
      value={{
        salaryList,
        setSalaryList
      }}
    >
      {children}
    </Context.Provider>
  );
};
