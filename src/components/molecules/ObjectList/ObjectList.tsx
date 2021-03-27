import * as React from 'react';
import { Button, Input, message } from 'antd';
import dayjs from 'dayjs';
import { useHistory } from 'estafette-router';
import { useRequest } from 'estafette';
import { objectApi } from 'api/objectApi/objectApi';
import { Loader } from 'components/atoms/Loader/Loader';
import { AdminMenu } from 'components/organisms/AdminMenu/AdminMenu';

import './ObjectList.scss';

export const success = () => {
  message.success('Объект активирован успешно!');
};

export const ObjectList = () => {
  const { push } = useHistory();
  const { Search } = Input;
  const { request, data, loading } = useRequest<any>();
  const {
    request: requestObject,
    data: objectData,
    loading: loadingObject
  } = useRequest<any>();
  const { request: requestChangeStatus, errors } = useRequest();

  const [check, setCheck] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [objectList, setObjectList] = React.useState<any>([]);
  const [holdObjects, setHoldObjects] = React.useState<any>([]);
  const [openObjects, setOpenObjects] = React.useState<any>([]);
  const [activeHold, setActiveHold] = React.useState<boolean>(false);
  const [activeOpen, setActiveOpen] = React.useState<boolean>(true);
  const [objectNumber, setObjectNumber] = React.useState<number>();

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
      const openObject = data.results.filter(
        (item: any) => item.state === 'OPEN'
      );
      const holdObject = data.results.filter(
        (item: any) => item.state === 'HOLD'
      );
      setHoldObjects(holdObject);
      setOpenObjects(openObject);
    }
  }, [data]);

  React.useEffect(() => {
    if (openObjects.length > 0) {
      setObjectList(openObjects);
    }
  }, [openObjects]);

  React.useEffect(() => {
    if (objectNumber) {
      const params = {
        state: 'OPEN',
        exercises: [...objectData.exercises],
        executors: [...objectData.executors],
        materials: [...objectData.materials],
        title: objectData.title,
        prepaid: objectData.prepaid,
        discount: objectData.discount,
        date_ending: objectData.date_ending,
        owner: objectData.owner
      };

      requestChangeStatus(objectApi.updateObject.action(params, objectNumber));

      !errors && success();
    }
  }, [objectNumber]);

  const onHoldList = () => {
    setObjectList(holdObjects);
    setActiveHold(true);
    setActiveOpen(false);
  };

  const onOpenList = () => {
    setObjectList(openObjects);
    setActiveOpen(true);
    setActiveHold(false);
  };

  const fetch = () => {
    request(objectApi.getObjectList.action(searchValue));
  };

  const onChangeStatus = async (objectId: any) => {
    await requestObject(objectApi.getObject.action(objectId));
    setObjectNumber(objectId);
  };

  const onSearch = (value: string) => setSearchValue(value);

  const deadLine = (time: any) => {
    let x = dayjs(Date()).format('YYYY-MM-DD').slice(8);
    let y = dayjs(time).format('YYYY-MM-DD').slice(8);
    let number1 = Number(x);
    let number2 = Number(y);
    if (number1 + 2 === number2) {
      return true;
    } else {
      return false;
    }
  };

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

      <div className="switch-list-buttons">
        <div className="switch-group">
          <Button
            className={`open-button ${activeOpen ? 'active' : ''}`}
            onClick={onOpenList}
          >
            Открытые
          </Button>
          <Button
            className={`hold-button ${activeHold ? 'active' : ''}`}
            onClick={onHoldList}
          >
            Ожидание
          </Button>
        </div>
      </div>

      <div className="object-list__items">
        {loading ? (
          <Loader />
        ) : (
          objectList.map((item: any) => (
            <div
              className={`object_item ${
                deadLine(item.date_ending) ? 'active' : ''
              }`}
              key={item.id}
            >
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

                  {item.state === 'OPEN' ? (
                    <Button
                      className="close-object"
                      onClick={() =>
                        push('AddWorkerTimePage', { objectId: item.id })
                      }
                    >
                      Время +/-
                    </Button>
                  ) : (
                    <Button
                      className="close-object"
                      loading={loadingObject}
                      onClick={() => onChangeStatus(item.id)}
                    >
                      Активировать
                    </Button>
                  )}

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
