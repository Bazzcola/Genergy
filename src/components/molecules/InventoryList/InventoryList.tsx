import * as React from 'react';
import { Button, Input } from 'antd';
import { useRequest } from 'estafette';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { InventoryAddModal } from 'components/atoms/InventoryAddModal/InventoryAddModal';
import { InventoryDeleteModal } from 'components/atoms/InventoryDeleteModal/InventoryDeleteModal';
import { Loader } from 'components/atoms/Loader/Loader';

import './InventoryList.scss';

export const InventoryList = () => {
  const { request, data, loading } = useRequest<any>({
    data: {},
    loading: true
  });
  const { Search } = Input;

  const [visible, setVisible] = React.useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [inventoryList, setInventoryList] = React.useState<any>([]);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [check, setCheck] = React.useState<boolean>(false);

  React.useEffect(() => {
    onFetch();
    setCheck(true);
  }, []);

  React.useEffect(() => {
    if (check) {
      onFetch();
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (data) {
      setInventoryList(data.results);
    }
  }, [data]);

  const onFetch = () => {
    request(instrumentListApi.getInstrumentList.action(searchValue));
    setEditId(null);
  };

  const onShowModal = () => {
    setVisible((prev) => !prev);
    setEditId(null);
  };

  const onDeleteModal = () => {
    setDeleteVisible((prev) => !prev);
    setEditId(null);
  };

  const onShowEditModal = (id: number) => {
    setVisible((prev) => !prev);
    setEditId(id);
  };

  const onShowDeleteModal = (id: number) => {
    setDeleteVisible((prev) => !prev);
    setEditId(id);
  };

  const onSearch = (value: string) => setSearchValue(value);

  return (
    <div className="inventory-list">
      <AdminMenu />
      {visible && (
        <InventoryAddModal
          onShow={onShowModal}
          onRefresh={onFetch}
          id={editId}
        />
      )}
      {deleteVisible && (
        <InventoryDeleteModal
          onShow={onDeleteModal}
          onRefresh={onFetch}
          id={editId}
          type="Удалить инвентарь"
        />
      )}

      <div className="title">
        <div className="title__text">Список инвентаря</div>

        <div className="action-group">
          <Search
            placeholder="Введите текст"
            allowClear
            enterButton="Поиск"
            onSearch={onSearch}
            className="search-input"
            loading={loading}
          />

          <Button className="add-button" onClick={onShowModal}>
            Добавить
          </Button>
        </div>
      </div>
      <div className="item_list">
        {loading ? (
          <Loader />
        ) : (
          inventoryList &&
          inventoryList.map((item: any) => (
            <div className="inventory-item" key={item.id}>
              <div className="inventory-item__name">{item.title}</div>
              <div className="inventory-item__quantity">
                Колличество - {item.count}
              </div>
              <div className="inventory-item__price">
                Ценна 1шт. - {item.price} лей.
              </div>
              <div className="button-edit-inventory">
                <Button onClick={() => onShowEditModal(item.id)}>
                  Редактировать
                </Button>
              </div>
              <div className="button-delete-inventory">
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
