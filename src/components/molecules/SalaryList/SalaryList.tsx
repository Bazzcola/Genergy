import * as React from 'react';
import { Button, Input } from 'antd';
import { useRequest } from 'estafette';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { userListApi } from 'api/userListApi/userListApi';
import { Loader } from 'components/atoms/Loader/Loader';

import './SalaryList.scss';

export const SalaryList = () => {
  const { request, data: dataUserList, loading, errors } = useRequest<any>({
    data: {},
    loading: true
  });
  const { Search } = Input;

  const [userList, setUserList] = React.useState<any>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [check, setCheck] = React.useState<boolean>(false);

  React.useEffect(() => {
    request(userListApi.getUserList.action(searchValue));
    setCheck(true);
  }, []);

  React.useEffect(() => {
    if (check) {
      request(userListApi.getUserList.action(searchValue));
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (dataUserList) {
      setUserList(dataUserList.results);
    }
  }, [dataUserList]);

  const onSearch = (value: string) => setSearchValue(value);

  return (
    <div className="salary-list">
      <AdminMenu />
      <div className="title">
        <div className="title__info">
          <div className="title__text">Список зарплат</div>
          <div className="title__period">Период 01.02.2021 - 01.03.2021</div>
        </div>

        <Search
          placeholder="Введите текст"
          allowClear
          enterButton="Поиск"
          onSearch={onSearch}
          className="search-input"
          loading={loading}
        />
      </div>
      <div className="item_list">
        {loading ? (
          <Loader />
        ) : (
          userList &&
          userList.map((item: any) => (
            <div className="salary-item" key={item.id}>
              <div className="salary-item__name">
                {item.fullname}
                <span>{item.gender}</span>
                <span>Тел. {item.phone}</span>
              </div>
              <div className="salary-item__salary">Зарплата - 0</div>
              <div className="salary-item__avans">Аванс - 0</div>
              <div className="salary-item__result">Остаток - 0</div>
              <div className="button-avans">
                <Button>Аванс</Button>
              </div>
              <div className="button-salary">
                <Button>Выдал ЗП</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="footer">
        <div className="title__total_number">{userList?.length} человек</div>
        <div className="title__total_salary">
          <span>Выдал 0 лей. / Осталось 0 лей.</span>
          <span>Всего к отплате 0 лей.</span>
        </div>
      </div>
    </div>
  );
};
