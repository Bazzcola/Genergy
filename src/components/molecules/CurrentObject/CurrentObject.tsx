import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'estafette-router';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './CurrentObject.scss';

export const CurrentObject = () => {
  const { push } = useHistory();
  const objectList = [
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description: [
        { work: 'Замена розетки', price: '100', quantity: '5' },
        { work: 'Замена розетки', price: '100', quantity: '5' },
        { work: 'Замена розетки', price: '100', quantity: '5' }
      ],
      object_work_material: [
        { title: 'Провод 20/3', price: '50', quantity: '2' },
        { title: 'Розетка', price: '70', quantity: '5' }
      ],
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    }
  ];

  return (
    <div className="current-object-list">
      <AdminMenu />
      <div className="current-object-list__title">Список текущих обьектов</div>
      <div className="current-object-list__items">
        {objectList.map((item, index) => (
          <div className="current-object_item" key={index}>
            <div className="current-object_item__title">
              <span className="object-name">Название: {item.object_name}</span>
              <div className="buttons-group">
                <Button
                  className="close-object"
                  onClick={() => push('EditObjectPage')}
                >
                  Редактировать
                </Button>

                <Button
                  className="close-object"
                  onClick={() => push('AddWorkerTimePage')}
                >
                  Время +/-
                </Button>

                <Button className="close-object">Закрыть???</Button>
              </div>
            </div>
            <div className="current-object_item__description">
              <span>Описание объекта</span>
              <br />
              {item.object_description}
            </div>
            <div className="current-object_item__workers">
              <div className="workers-list">
                <span>Список работников</span>
                <ul>
                  {item.object_workers.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="current-object_work-detail">
              <span>Описание работ</span>
              {item.object_work_description.map((item: any) => (
                <div className="current-object_work-detail__description">
                  <span>{item.work}</span> - {item.quantity}шт - {item.price}
                  лей.
                </div>
              ))}

              <span>Описание материалов</span>
              {item.object_work_material.map((item: any) => (
                <div className="current-object_work-detail__description">
                  <span>{item.title}</span> - {item.quantity}шт - {item.price}
                  лей.
                </div>
              ))}

              {/* <div className="object_work-detail__price">
                            Примерно {item.object_work_detail_price} лей.
                        </div> */}
            </div>
            <div className="current-object_avans">
              Аванс {item.object_work_avans} лей.
            </div>
            <div className="current-object_price">
              Стоимость обьекта {item.object_work_price} лей.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
