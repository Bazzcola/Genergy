import * as React from 'react';
import { Button } from 'antd';
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
  const [userList, setUserList] = React.useState<any>([]);

  React.useEffect(() => {
    request(userListApi.getUserList.action({}));
  }, []);

  React.useEffect(() => {
    if (dataUserList) {
      setUserList(dataUserList.results);
    }
  }, [dataUserList]);

  console.log(dataUserList);

  return (
    <div className="salary-list">
      <AdminMenu />
      <div className="title">
        <div className="title__text">Список зарплат</div>
        <div className="title__period">Период 01.02.2021 - 01.03.2021</div>
      </div>
      <div className="item_list">
        {loading ? (
          <Loader />
        ) : (
          userList &&
          userList.map((item: any) => (
            <div className="salary-item" key={item.id}>
              <div className="salary-item__name">
                {item.username}
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
