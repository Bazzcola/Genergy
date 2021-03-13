import * as React from 'react';
import { Modal, Input } from 'antd';
import { useRequest } from 'estafette';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';

import '../InventoryAddModal/InventoryAddModal.scss';

interface Modal {
  onShow: () => void;
  onRefresh: () => void;
  id?: number | null;
}

export const InventoryAddModal: React.FC<Modal> = ({
  onShow,
  onRefresh,
  id
}) => {
  const { request, loading, errors } = useRequest();
  const { request: requestInventoryItem, data: dataInventoryItem } = useRequest<
    any
  >();
  const { request: requestEdit, loading: loadingEdit } = useRequest();
  const [title, setTitle] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [count, setCount] = React.useState<string>('');

  React.useEffect(() => {
    if (id) {
      requestInventoryItem(instrumentListApi.getInstrumentItem.action(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (dataInventoryItem) {
      setTitle(dataInventoryItem.title);
      setPrice(dataInventoryItem.price);
      setCount(dataInventoryItem.count);
    }
  }, [dataInventoryItem]);

  const onEdit = async () => {
    const params = {
      title,
      price: parseFloat(price),
      count: parseFloat(count),
      id
    };

    try {
      await requestEdit(instrumentListApi.updateInstrumentItem.action(params));
      onShow();
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onFetch = async () => {
    const params = {
      title,
      price: parseFloat(price),
      count: parseFloat(count)
    };

    try {
      await request(instrumentListApi.createInstrumentItem.action(params));
      onShow();
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    if (id) {
      onEdit();
    } else {
      onFetch();
    }
  };

  const handleCancel = () => {
    onShow();
  };

  return (
    <>
      <Modal
        title={id ? 'Редактировать инвентарь' : 'Добавить инвентарь'}
        visible
        onOk={handleOk}
        confirmLoading={loading || loadingEdit}
        onCancel={handleCancel}
      >
        <div className="input-fields">
          <Input
            placeholder="Название инвентаря"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p>{errors.title[0]}</p>}
          <Input
            placeholder="Ценна инвентаря"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price[0]}</p>}
          <Input
            placeholder="Колличество инвентаря"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          {errors.count && <p>{errors.count[0]}</p>}
        </div>
      </Modal>
    </>
  );
};
