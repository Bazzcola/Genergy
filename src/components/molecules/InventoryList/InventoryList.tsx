import * as React from 'react';
import { Button } from 'antd';
import { useRequest } from 'estafette';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { InventoryAddModal } from 'components/atoms/InventoryAddModal/InventoryAddModal';

import './InventoryList.scss';

export const InventoryList = () => {
  const {request, data, loading} = useRequest<any>({data:{}});

  const [visible, setVisible] = React.useState<boolean>(false);
  const [inventoryList, setInventoryList] = React.useState<any>([]);

  React.useEffect(() => {
    request(instrumentListApi.getInstrumentList.action({}));
  },[])

  React.useEffect(() => {
    if (data) {
      setInventoryList(data.results);
    }
  }, [data]);

  const onShowModal = () => {
    setVisible(prev => !prev)
  }

  console.log(inventoryList);

  return (
    <div className="inventory-list">
      <AdminMenu />
      {visible && <InventoryAddModal onShow={onShowModal}/>}
      <div className="title">
        <div className="title__text">Список инвентаря</div>
        <Button className="add-button" onClick={onShowModal}>Добавить</Button>
      </div>
      <div className="item_list">
        {inventoryList && inventoryList.map((item:any) => (
          <div className="inventory-item" key={item.id}>
            <div className="inventory-item__name">{item.title}</div>
            <div className="inventory-item__quantity">
              Колличество - {item.count}
            </div>
            <div className="inventory-item__price">
              Ценна 1шт. - {item.price} лей.
            </div>
            <div className="button-edit-inventory">
              <Button>Редактировать</Button>
            </div>
            <div className="button-delete-inventory">
              <Button>Удалить</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
