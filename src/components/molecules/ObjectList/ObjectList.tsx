import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './ObjectList.scss';

export const ObjectList = () => {
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
    <div className="object-list">
      <div className="object-list__title">Список обьектов</div>
      <div className="object-list__items">
        {objectList.map((item, index) => (
          <div className="object_item" key={index}>
            <div className="object_item__title">
              <span>Название: {item.object_name}</span>
              <NavLink to="/admin_menu/edit_object" activeClassName="selected">
                <button className="close-object">Редактировать</button>
              </NavLink>
              <NavLink to="/admin_menu/edit_object_worker_time" activeClassName="selected">
                <button className="close-object">Время +/-</button>
              </NavLink>
              <button className="close-object">Закрыть</button>
            </div>
            <div className="object_item__description">
              {item.object_description}
            </div>
            <div className="object_item__workers">
              <div className="workers-list">
                <span>Список работников</span>
                <ul>
                  {item.object_workers.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="object_work-detail">
              <span>Описание работ</span>
              <div className="object_work-detail__description">
                {item.object_work_description}
              </div>

              <span>Описание материалов</span>
              <div className="object_work-detail__description">
                {item.object_work_description}
              </div>
              {/* <div className="object_work-detail__price">
                Примерно {item.object_work_detail_price} лей.
              </div> */}
            </div>
            <div className="object_avans">
              Аванс {item.object_work_avans} лей.
            </div>
            <div className="object_price">
              Стоимость обьекта {item.object_work_price} лей.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
