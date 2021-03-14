import * as React from 'react';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import { materialListApi } from 'api/materialListApi/materialListApi';
import { Loader } from 'components/atoms/Loader/Loader';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { WerehouseAddModal } from 'components/atoms/WerehouseAddModal/WerehouseAddModal';
import { WerehouseDeleteModal } from 'components/atoms/WerehouseDeleteModal/WerehouseDeleteModal';

import './WerehouseList.scss';

export const WerehouseList = () => {
  const { request, data, loading } = useRequest<any>({
    data: {},
    loading: true
  });

  const [visible, setVisible] = React.useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [werehouseList, setWerehouseList] = React.useState<any>([]);
  const [materialId, setMaterialId] = React.useState<any>(null);

  React.useEffect(() => {
    onFetch();
  }, []);

  React.useEffect(() => {
    if (data) {
      setWerehouseList(data.results);
    }
  }, [data]);

  console.log(werehouseList);

  const onFetch = () => {
    request(materialListApi.getMaterialList.action({}));
  };

  const onShowModal = () => {
    setVisible((prev) => !prev);
    setMaterialId(null);
  };

  const onShowEditModal = (mat_id: number) => {
    setVisible((prev) => !prev);
    setMaterialId(mat_id);
  };

  const onDeleteModal = () => {
    setDeleteVisible((prev) => !prev);
    setMaterialId(null);
  };

  const onShowDeleteModal = (mat_id: number) => {
    setDeleteVisible((prev) => !prev);
    setMaterialId(mat_id);
  };

  return (
    <div className="werehouse-list">
      <AdminMenu />
      {visible && (
        <WerehouseAddModal
          onShow={onShowModal}
          onRefresh={onFetch}
          id={materialId}
        />
      )}
      {deleteVisible && (
        <WerehouseDeleteModal
          onShow={onDeleteModal}
          onRefresh={onFetch}
          id={materialId}
          type="Удалить материал"
        />
      )}
      <div className="werehouse-list__title">
        <span>Список материалов</span>
        <Button className="add-material" onClick={onShowModal}>
          Добавить
        </Button>
      </div>
      <div className="werehouse-list__items">
        {loading ? (
          <Loader />
        ) : (
          werehouseList &&
          werehouseList.map((item: any) => (
            <div className="werehouse-item" key={item.id}>
              <div className="werehouse-item__name">{item.title}</div>
              <div className="werehouse-item__buy-price">
                Ценна покупки - {item.price} лей.
              </div>
              <div className="werehouse-item__sell-price">
                Ценна продажи - {item.price} лей.
              </div>
              <div className="werehouse-item__quantity">
                Колличество - {item.count} шт.
              </div>
              <div className="button-edit-werehouse">
                <Button onClick={() => onShowEditModal(item.id)}>
                  Редактировать
                </Button>
              </div>
              <div className="button-delete-werehouse">
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
