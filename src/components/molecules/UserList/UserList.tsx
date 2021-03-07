import React from 'react';
import { useHistory } from 'estafette-router';
import { Button } from 'antd';
import { Context } from 'context/Context';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './UserList.scss';

export const UserList = () => {
  const { salaryList } = React.useContext(Context);
  const { push } = useHistory();

  return (
    <div className="user-list">
      <AdminMenu />
      <div className="title">
        <div className="title__text">Список персонала</div>
      </div>
      <div className="item_list">
        {salaryList.map((item, index) => (
          <div className="user-item-content" key={item.name}>
            <div className="user-item">
              <div className="user-item__name">{item.name}</div>
              <div className="user-item__quantity">Телефон: {item.phone}</div>
              <div className="user-item__price">Мат. на сумму : 14550 лей.</div>
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
