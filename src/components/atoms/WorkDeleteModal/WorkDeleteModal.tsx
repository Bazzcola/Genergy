import * as React from 'react';
import { Modal } from 'antd';
import { useRequest } from 'estafette';
import { workListApi } from 'api/workListApi/workListApi';

import '../WorkDeleteModal/WorkDeleteModal.scss';

interface Modal {
  onShow: () => void;
  onRefresh: () => void;
  id: number | null;
  type?: string;
}

export const WorkDeleteModal: React.FC<Modal> = ({
  onShow,
  onRefresh,
  id,
  type
}) => {
  const { request, loading, errors } = useRequest();

  const onDelete = async () => {
    if (id) {
      try {
        await request(workListApi.deleteWorkItem.action(id));
        onShow();
        onRefresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOk = () => {
    onDelete();
  };

  const handleCancel = () => {
    onShow();
  };

  return (
    <>
      <Modal
        title={type ? type : 'Удалить'}
        visible
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <div className="delete-modal-text">
          <span>Вы действительно хотите удалить?</span>
        </div>
      </Modal>
    </>
  );
};
