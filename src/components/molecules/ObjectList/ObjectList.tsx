import * as React from 'react';
import { Button, Input } from 'antd';
import { useHistory } from 'estafette-router';
import { useRequest } from 'estafette';
import { objectApi } from 'api/objectApi/objectApi';
import { Loader } from 'components/atoms/Loader/Loader';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './ObjectList.scss';

export const ObjectList = () => {
  const { push } = useHistory();
  const { Search } = Input;
  const { request, data, loading } = useRequest<any>();

  const [check, setCheck] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [objectList, setObjectList] = React.useState<any>([]);

  React.useEffect(() => {
    fetch();
    setCheck(true);
  }, []);

  React.useEffect(() => {
    if (check) {
      fetch();
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (data.results) {
      setObjectList(data.results);
    }
  }, [data]);

  const fetch = () => {
    request(objectApi.getObjectList.action(searchValue));
  };

  const onSearch = (value: string) => setSearchValue(value);

  console.log(data.results, 'results');

  return (
    <div className="object-list">
      <AdminMenu />
      <div className="object-list__title">
        <span>Список обьектов</span>

        <Search
          placeholder="Введите текст"
          allowClear
          enterButton="Поиск"
          onSearch={onSearch}
          className="search-input"
          loading={loading}
        />
      </div>
      <div className="object-list__items">
        {loading ? (
          <Loader />
        ) : (
          objectList.map((item: any) => (
            <div className="object_item" key={item.id}>
              <div className="object_item__title">
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

                  <Button className="close-object">Закрыть</Button>
                </div>
              </div>

              <div className="object_item__description">
                <span>Дата завершения объекта</span>
                <br />
                {item.date_ending
                  ? item.date_ending.substring(0, 10)
                  : 'нету даты'}
              </div>

              <div className="object_item__workers">
                <div className="workers-list">
                  <span>Список работников</span>
                  <ul>
                    {item.executors.map((item: any) => (
                      <li key={item.id}>{item.fullname || 'нет имени'}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="object_work-detail">
                <span>Описание работ</span>

                {item.exercises.map((item: any) => (
                  <div
                    className="object_work-detail__description"
                    key={item.id}
                  >
                    <span>{item.title || 'нет названия'}</span> - {item.count}{' '}
                    шт - {item.price || 'нет ценны'} лей.
                  </div>
                ))}

                <span>Описание материалов</span>

                {item.materials.map((item: any) => (
                  <div
                    className="object_work-detail__description"
                    key={item.id}
                  >
                    <span>{item.title || 'нет названия'}</span> - {item.count}{' '}
                    шт - {item.price || 'нет ценны'} лей.
                  </div>
                ))}

                {/* <div className="object_work-detail__price">
                Примерно {item.object_work_detail_price} лей.
              </div> */}
              </div>
              <div className="object_avans">Аванс {item.prepaid} лей.</div>
              <div className="object_price">
                Стоимость обьекта {item.total_price} лей.
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
