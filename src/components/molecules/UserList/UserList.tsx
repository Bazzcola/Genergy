import React, { useState, useEffect } from 'react';
import { useHistory } from 'estafette-router';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import { userListApi } from 'api/userListApi/userListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { Loader } from 'components/atoms/Loader/Loader';
import { UserDeleteModal } from 'components/atoms/UserDeleteModal/UserDeleteModal';

import './UserList.scss';

export const UserList = () => {
  const { request, data: dataUserList, loading, errors } = useRequest<any>({
    data: {}
  });

  const { push } = useHistory();

  const [userList, setUserList] = useState<any>([]);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    onFetch();
  }, []);

  useEffect(() => {
    if (dataUserList) {
      setUserList(dataUserList.results);
    }
  }, [dataUserList]);

  const onFetch = () => {
    request(userListApi.getUserList.action({}));
  };

  const onDeleteUser = () => {
    setDeleteVisible((prev) => !prev);
    setDeleteId(null);
  };

  const onShowDeleteModal = (id: number) => {
    setDeleteVisible((prev) => !prev);
    setDeleteId(id);
  };

  return (
    <div className="user-list">
      <AdminMenu />
      {deleteVisible && (
        <UserDeleteModal
          onShow={onDeleteUser}
          onRefresh={onFetch}
          id={deleteId}
          type="Удалить пользователя"
        />
      )}
      <div className="title">
        <div className="title__text">Список персонала</div>
      </div>
      <div className="item_list">
        {loading ? (
          <Loader />
        ) : (
          userList &&
          userList.map((item: any) => (
            <div className="user-item-content" key={item.id}>
              <div className="user-item">
                <div className="user-item__name">
                  {item.fullname}
                  <br />
                  {item.gender.toLowerCase()}
                </div>
                <div className="user-item__quantity">Телефон: {item.phone}</div>
                <div className="user-item__price">
                  Мат. на сумму : 14550 лей.
                </div>
                <div className="button-edit-user">
                  <Button
                    onClick={() =>
                      push('ProfileAddMatPage', { userId: item.id })
                    }
                  >
                    Добавить Мат.
                  </Button>
                </div>
                <div className="button-edit-user">
                  <Button onClick={() => push('ProfileEditMatPage')}>
                    Редактировать Мат.
                  </Button>
                </div>
                <div className="button-edit-user">
                  <Button onClick={() => onShowDeleteModal(item.id)}>
                    <span>Удалить Работника</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
