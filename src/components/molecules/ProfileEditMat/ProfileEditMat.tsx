import * as React from 'react';
import { Form, InputNumber, Button } from 'antd';
import { useRequest } from 'estafette';
import { useParams } from 'estafette-router';
import { materialListApi } from 'api/materialListApi/materialListApi';
import { instrumentListApi } from 'api/instrumentListApi/instrumentListApi';
import { werehouseApi } from 'api/werehouseApi/werehouseApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { Loader } from 'components/atoms/Loader/Loader';

import './ProfileEditMat.scss';

export const ProfileEditMat = () => {
  const { userId } = useParams<any>();
  const {
    request: requestAddMaterial,
    loading: loadingAddMaterial
  } = useRequest();
  const {
    request: requestAddInventory,
    loading: loadingAddInventory
  } = useRequest();
  const {
    request: requestInventoryList,
    data: dataInventoryList,
    loading: loadingInventoryList
  } = useRequest<any>();
  const {
    request: requestMaterialList,
    data: dataMaterialList,
    loading: loadingMaterialList
  } = useRequest<any>();

  const [materialList, setMaterialList] = React.useState<any>();
  const [inventoryList, setInventoryList] = React.useState<any>();

  React.useEffect(() => {
    requestMaterialList(materialListApi.getMaterialList.action(''));
    requestInventoryList(instrumentListApi.getInstrumentList.action(''));
  }, []);

  React.useEffect(() => {
    if (dataInventoryList) {
      setInventoryList(dataInventoryList.results);
    }

    if (dataMaterialList) {
      setMaterialList(dataMaterialList.results);
    }
  }, [dataInventoryList, dataMaterialList]);

  console.log(materialList, 'mat');
  console.log(inventoryList, 'inventory');
  console.log(userId, 'user-id');

  const onFinishAddMaterial = (values: any) => {
    console.log('material', values);

    const params = {
      id: userId
    };
    // requestAddMaterial(werehouseApi.addMaterialsToUser.action());
  };

  const onFinishAddInventory = (values: any) => {
    console.log('inventory', values);

    const params = {
      id: userId
    };
    // requestAddMaterial(werehouseApi.addInstrumentsToUser.action());
  };

  return (
    <div className="profile-edit-material">
      <AdminMenu />
      <div className="edit-material">
        {loadingMaterialList || loadingInventoryList ? (
          <Loader />
        ) : (
          <>
            <Form onFinish={onFinishAddMaterial} className="edit-form-material">
              <h1>Список материалов</h1>
              {materialList &&
                materialList.map((item: any) => (
                  <Form.Item
                    className="material-container"
                    key={item.id}
                    name={['materials', `${item.id}`]}
                  >
                    <div className="material-item">
                      <span>{item.title}</span>{' '}
                      <span>на складе: {item.count} шт.</span>
                      <InputNumber placeholder="кол-во" />
                    </div>
                  </Form.Item>
                ))}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="object-submit-btn"
                  loading={loadingAddMaterial}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>

            <Form
              onFinish={onFinishAddInventory}
              className="edit-form-material"
            >
              <h1>Список инвентаря</h1>
              {inventoryList &&
                inventoryList.map((item: any) => (
                  <Form.Item
                    className="inventory-container"
                    key={item.id}
                    name={['inventory', `${item.id}`]}
                  >
                    <div className="inventory-item">
                      <span>{item.title}</span>{' '}
                      <span>на складе: {item.count} шт.</span>
                      <InputNumber placeholder="кол-во" />
                    </div>
                  </Form.Item>
                ))}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="object-submit-btn"
                  loading={loadingAddInventory}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
