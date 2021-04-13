import * as React from 'react';
import dayjs from 'dayjs';
import { Button, Input } from 'antd';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import { objectApi } from 'api/objectApi/objectApi';
import { userListApi } from 'api/userListApi/userListApi';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';
import { Loader } from 'components/atoms/Loader/Loader';

import './CurrentObject.scss';

export const CurrentObject = () => {
  const { push } = useHistory();
  const { Search } = Input;
  const {
    request: requstObjectList,
    data: dataObjectList,
    loading: loadingDataList
  } = useRequest<any>();
  const { request: requestProfile, data: dataProfile } = useRequest<any>();

  const [check, setCheck] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  React.useEffect(() => {
    if (check) {
      fetch();
    }
  }, [searchValue]);

  React.useEffect(() => {
    requestProfile(userListApi.getUserProfile.action({}));
    setCheck(true);
  }, []);

  React.useEffect(() => {
    if (dataProfile.id) {
      fetch();
    }
  }, [dataProfile]);

  console.log(dataObjectList);

  const fetch = () => {
    requstObjectList(
      objectApi.getOwnObject.action(dataProfile.id, searchValue)
    );
  };

  const onSearch = (value: string) => setSearchValue(value);

  const deadLine = (time: any) => {
    let x = dayjs(Date()).format('YYYY-MM-DD').slice(8);
    let y = dayjs(time).format('YYYY-MM-DD').slice(8);
    let number1 = Number(x);
    let number2 = Number(y);
    
    if (number1 + 2 === number2 || number1 + 1 === number2 || number1 === number2 || number1 < number2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="current-object-list">
      <AdminMenu />
      <div className="current-object-list__title">
        <span>Список текущих обьектов</span>

        <Search
          placeholder="Введите текст"
          allowClear
          enterButton="Поиск"
          onSearch={onSearch}
          className="search-input"
          loading={loadingDataList}
        />
      </div>

      <div className="current-object-list__items">
        {loadingDataList ? (
          <Loader />
        ) : (
          dataObjectList.map((item: any) => (
            <div
              className={`current-object_item ${
                deadLine(item.date_ending) ? 'active' : ''
              }`}
              key={item.id}
            >
              <div className="current-object_item__title">
                <span>Название: {item.title}</span>
                <div className="buttons-group">
                  <Button
                    className="close-object"
                    onClick={() =>
                      push('EditObjectPage', { objectId: item.id })
                    }
                  >
                    Редактировать
                  </Button>

                  <Button
                    className="close-object"
                    onClick={() =>
                      push('AddWorkerTimePage', { objectId: item.id })
                    }
                  >
                    Время +/-
                  </Button>
                </div>
              </div>

              <div className="current-object_item__description">
                <span>Дата завершения объекта</span>
                <br />
                {item.date_ending
                  ? item.date_ending.substring(0, 10)
                  : 'нету даты'}
              </div>

              <div className="current-object_item__workers">
                <div className="workers-list">
                  <span>Список работников</span>
                  <ul>
                    {item.executors.map((item: any) => (
                      <li key={item.id}>{item.user.fullname || 'нет имени'}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="current-object_work-detail">
                <span>Описание работ</span>

                {item.exercises.map((item: any) => (
                  <div
                    className="current-object_work-detail__description"
                    key={item.id}
                  >
                    <span>{item.work.title || 'нет названия'}</span> -{' '}
                    {item.count} шт -{' '}
                    {item.exercises_final_price || 'нет ценны'} лей.
                  </div>
                ))}

                <span>Описание материалов</span>

                {item.materials.map((item: any) => (
                  <div
                    className="current-object_work-detail__description"
                    key={item.id}
                  >
                    <span>{item.user.title || 'нет названия'}</span> -{' '}
                    {item.count} шт -{' '}
                    {item.materials_final_price || 'нет ценны'} лей.
                  </div>
                ))}
              </div>
              <div className="current-object_avans">
                Аванс {item.prepaid} лей.
              </div>
              <div className="current-object_price">
                Стоимость обьекта {item.total_price || 'нет ценны'} лей.
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
