import * as React from 'react';
import { Modal } from 'antd';

interface Modal {
    onShow:() => void;
}

export const WerehouseAddModal:React.FC<Modal> = ({onShow}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  
  const handleOk = () => {
    setConfirmLoading(true);
    onShow();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    onShow();
  };

  return (
    <>
      <Modal
        title="Title"
        visible
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Контент</p>
      </Modal>
    </>
  );
};