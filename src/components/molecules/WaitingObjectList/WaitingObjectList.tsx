import React from 'react';
import { useHistory } from 'estafette-router';
import { Button } from 'antd';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './WaitingObjectList.scss';

export const WaitingObjectList = () => {
  const { push } = useHistory();

  const objectList = [
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    },
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    },
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    },
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    },
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    },
    {
      object_name: 'Ларёк',
      object_description:
        'Описание обьекта. Ларёк или будка или хз что там Федя чинит, провода провести, счетчик смотать или левый свет замутить, как то так!',
      object_workers: ['Петя', 'Вася', 'Женя'],
      object_work_description:
        'провести, счетчик смотать или левый свет замутить',
      object_work_detail_price: 1440,
      object_work_avans: 0,
      object_work_price: 1440
    }
  ];

  return (
    <div className="waiting-object-list">
      <AdminMenu />
      <div className="waiting-object-list__title">
        Список ожидаемых обьектов
      </div>
      <div className="waiting-object-list__items">
        {objectList.map((item, index) => (
          <div className="waiting-object_item" key={index}>
            <div className="waiting-object_item__title">
              <span>Название: {item.object_name}</span>
              <div className="buttons-group">
                <Button className="close-object">Добавить</Button>

                <Button
                  className="close-object"
                  onClick={() => push('EditObjectPage')}
                >
                  Редактировать
                </Button>

                <Button className="close-object">Удалить</Button>
              </div>
            </div>
            <div className="waiting-object_item__description">
              <span>Описание объекта</span>
              <br />
              {item.object_description}
            </div>
            <div className="waiting-object_item__workers">
              <div className="workers-list">
                <span>Список работников</span>
                <ul>
                  {item.object_workers.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="waiting-object_work-detail">
              <span>Описание работ</span>
              <div className="waiting-object_work-detail__description">
                {item.object_work_description}
              </div>

              <span>Описание материалов</span>
              <div className="waiting-object_work-detail__description">
                {item.object_work_description}
              </div>
              {/* <div className="object_work-detail__price">
                            Примерно {item.object_work_detail_price} лей.
                        </div> */}
            </div>
            <div className="waiting-object_avans">
              Аванс {item.object_work_avans} лей.
            </div>
            <div className="waiting-object_price">
              Стоимость обьекта {item.object_work_price} лей.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
