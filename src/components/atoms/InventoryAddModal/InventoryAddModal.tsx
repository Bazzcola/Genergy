import * as React from 'react';
import { Modal, Input } from 'antd';
import { useRequest } from 'estafette';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';

import '../InventoryAddModal/InventoryAddModal.scss';

interface Modal {
    onShow:() => void;
}

export const InventoryAddModal:React.FC<Modal> = ({onShow}) => {
  const {request, loading, errors} = useRequest();
  const [title, setTitle] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [count, setCount] = React.useState<string>('');
 
  const onFetch = async() => {
    const params = {
      title,
      price:parseFloat(price),
      count:parseFloat(count),
    }
    
    try {
      await request(instrumentListApi.createInstrumentItem.action(params))
      onShow();
    } catch (error) {
      console.log(error)
    }
  }

  const handleOk = () => {
    onFetch();
  };

  const handleCancel = () => {
    onShow();
  };

  return (
    <>
      <Modal
        title="Добавить инвентарь"
        visible
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <div className="input-fields">
          <Input placeholder="Название инвентаря" onChange={(e) => setTitle(e.target.value)}/>
          {errors.title && <p>{errors.title[0]}</p>}
          <Input placeholder="Ценна инвентаря" onChange={(e) => setPrice(e.target.value)}/>
          {errors.price && <p>{errors.price[0]}</p>}
          <Input placeholder="Колличество инвентаря" onChange={(e) => setCount(e.target.value)}/>
          {errors.count && <p>{errors.count[0]}</p>}
        </div>
      </Modal>
    </>
  );
};