import * as React from 'react';
import { Input, Modal } from 'antd';
import { useRequest } from 'estafette';
import { materialListApi } from 'api/materialListApi/materialListApi';

import '../WerehouseAddModal/WerehouseAddModal.scss';

interface Modal {
  onShow: () => void;
  onRefresh: () => void;
  id?: number | null;
}

export const WerehouseAddModal: React.FC<Modal> = ({
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
  const [sellPrice, setSellPrice] = React.useState<string>('');
  const [count, setCount] = React.useState<string>('');

  React.useEffect(() => {
    if (id) {
      requestInventoryItem(materialListApi.getMaterialItem.action(id));
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
      await requestEdit(materialListApi.updateMaterialItem.action(params));
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
      await request(materialListApi.createMaterialItem.action(params));
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
        title={id ? 'Редактировать материал' : 'Добавить материал'}
        visible
        onOk={handleOk}
        confirmLoading={loading || loadingEdit}
        onCancel={handleCancel}
      >
        <div className="input-fields">
          <Input
            placeholder="Название материала"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p>{errors.title[0]}</p>}
          <Input
            placeholder="Ценна покупки материала"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price[0]}</p>}
          <Input
            placeholder="Ценна продажи материала"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price[0]}</p>}
          <Input
            placeholder="Колличество материала"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          {errors.count && <p>{errors.count[0]}</p>}
        </div>
      </Modal>
    </>
  );
};
