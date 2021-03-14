import * as React from 'react';
import { Modal, Input } from 'antd';
import { useRequest } from 'estafette';
import { workListApi } from 'api/workListApi/workListApi';

import '../WorkAddModal/WorkAddModal.scss';

interface Modal {
  onShow: () => void;
  onRefresh: () => void;
  id?: number | null;
}

export const WorkAddModal: React.FC<Modal> = ({ onShow, onRefresh, id }) => {
  const { request, loading, errors } = useRequest();
  const { request: requestInventoryItem, data: dataInventoryItem } = useRequest<
    any
  >();
  const { request: requestEdit, loading: loadingEdit } = useRequest();
  const [title, setTitle] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');

  React.useEffect(() => {
    if (id) {
      requestInventoryItem(workListApi.getWorkItem.action(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (dataInventoryItem) {
      setTitle(dataInventoryItem.title);
      setPrice(dataInventoryItem.price);
    }
  }, [dataInventoryItem]);

  const onEdit = async () => {
    const params = {
      title,
      price: parseFloat(price),
      id
    };

    try {
      await requestEdit(workListApi.updateWorkItem.action(params));
      onShow();
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onFetch = async () => {
    const params = {
      title,
      price: parseFloat(price)
    };

    try {
      await request(workListApi.createWorkItem.action(params));
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
        title={id ? 'Редактировать работу' : 'Добавить работу'}
        visible
        onOk={handleOk}
        confirmLoading={loading || loadingEdit}
        onCancel={handleCancel}
      >
        <div className="input-fields">
          <Input
            placeholder="Название работы"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p>{errors.title[0]}</p>}
          <Input
            placeholder="Ценна работы"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price[0]}</p>}
        </div>
      </Modal>
    </>
  );
};
