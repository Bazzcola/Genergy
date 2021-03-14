import * as React from 'react';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { WorkAddModal } from 'components/atoms/WorkAddModal/WorkAddModal';
import { WorkDeleteModal } from 'components/atoms/WorkDeleteModal/WorkDeleteModal';
import { workListApi } from 'api/workListApi/workListApi';
import { Loader } from 'components/atoms/Loader/Loader';

import './WorkList.scss';

export const WorkList = () => {
  const { request, data, loading } = useRequest<any>({ data: {} });

  const [visible, setVisible] = React.useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [workId, setWorkId] = React.useState<number | null>(null);
  const [dataWorkList, setDataWorkList] = React.useState<any>([]);

  React.useEffect(() => {
    onFetch();
  }, []);

  React.useEffect(() => {
    if (data) {
      setDataWorkList(data.results);
    }
  }, [data]);

  const onFetch = () => {
    request(workListApi.getWorkList.action({}));
  };

  const onShowModal = () => {
    setVisible((prev) => !prev);
    setWorkId(null);
  };

  const onShowEditModal = (mat_id: number) => {
    setVisible((prev) => !prev);
    setWorkId(mat_id);
  };

  const onDeleteModal = () => {
    setDeleteVisible((prev) => !prev);
    setWorkId(null);
  };

  const onShowDeleteModal = (mat_id: number) => {
    setDeleteVisible((prev) => !prev);
    setWorkId(mat_id);
  };

  return (
    <div className="work-list">
      <AdminMenu />
      {visible && (
        <WorkAddModal onShow={onShowModal} onRefresh={onFetch} id={workId} />
      )}
      {deleteVisible && (
        <WorkDeleteModal
          onShow={onDeleteModal}
          onRefresh={onFetch}
          id={workId}
          type="Удалить работу"
        />
      )}
      <div className="title">
        <div className="title__text">Список работ</div>
        <Button className="add-button" onClick={onShowModal}>
          Добавить
        </Button>
      </div>
      <div className="item_list">
        {loading ? (
          <Loader />
        ) : (
          dataWorkList &&
          dataWorkList.map((item: any) => (
            <div className="work-item" key={item.id}>
              <div className="work-item__name">{item.title}</div>
              <div className="work-item__quantity">Колличество - 1 шт.</div>
              <div className="work-item__price">Ценна - {item.price} лей.</div>
              <div className="button-edit-work">
                <Button onClick={() => onShowEditModal(item.id)}>
                  Редактировать
                </Button>
              </div>
              <div className="button-delete-work">
                <Button onClick={() => onShowDeleteModal(item.id)}>
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
