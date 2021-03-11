import React, { useState, useEffect } from 'react';
import { useHistory } from 'estafette-router';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import { userListApi } from 'api/userListApi/userListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './UserList.scss';

export const UserList = () => {
  const { request, data: dataUserList, loading, errors } = useRequest<any>({
    data: {}
  });
  const { push } = useHistory();

  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    request(userListApi.getUserList.action({}));
  }, []);

  useEffect(() => {
    if (dataUserList) {
      setUserList(dataUserList.results);
    }
  }, [dataUserList]);

  console.log(dataUserList);

  return (
    <div className="user-list">
      <AdminMenu />
      <div className="title">
        <div className="title__text">Список персонала</div>
      </div>
      <div className="item_list">
        {userList &&
          userList.map((item: any) => (
            <div className="user-item-content" key={item.id}>
              <div className="user-item">
                <div className="user-item__name">{item.fullname}</div>
                <div className="user-item__quantity">Телефон: {item.phone}</div>
                <div className="user-item__price">
                  Мат. на сумму : 14550 лей.
                </div>
                <div className="button-edit-user">
                  <Button onClick={() => push('ProfileAddMatPage')}>
                    Добавить Мат.
                  </Button>
                </div>
                <div className="button-edit-user">
                  <Button onClick={() => push('ProfileEditMatPage')}>
                    Редактировать Мат.
                  </Button>
                </div>
                <div className="button-edit-user">
                  <Button>
                    <span>Удалить Работника</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
