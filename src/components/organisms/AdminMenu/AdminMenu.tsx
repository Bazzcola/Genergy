import * as React from 'react';
import { Dropdown, Button, Menu, message } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import { userListApi } from 'api/userListApi/userListApi';
import { InventoryList } from 'components/molecules/InventoryList/InventoryList';
import { ObjectList } from 'components/molecules/ObjectList/ObjectList';
import { SalaryList } from 'components/molecules/SalaryList/SalaryList';
import { WerehouseList } from 'components/molecules/WerehouseList/WerehouseList';
import { WorkList } from 'components/molecules/WorkList/WorkList';
import { AdminCreateUser } from 'components/molecules/AdminCreateUser/AdminCreateUser';
import { CreateObject } from 'components/molecules/CreateObject/CreateObject';
import { UserList } from 'components/molecules/UserList/UserList';
import { UserProfile } from 'components/molecules/UserProfile/UserProfile';
import { ProfileAddMat } from 'components/molecules/ProfileAddMat/ProfileAddMat';
import { ProfileEditMat } from 'components/molecules/ProfileEditMat/ProfileEditMat';
import { WaitingObjectList } from 'components/molecules/WaitingObjectList/WaitingObjectList';
import { EditObject } from 'components/molecules/EditObject/EditObject';
import { AddWorkerTime } from 'components/molecules/AddWorkerTime/AddWorkerTime';
import { CurrentObject } from 'components/molecules/CurrentObject/CurrentObject';

import './AdminMenu.scss';

export const AdminMenu = () => {
  const { request, data, loading, errors } = useRequest();
  const { push } = useHistory();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  React.useEffect(() => {
    request(userListApi.getUserList({}));
  }, []);

  console.log(data);

  React.useEffect(() => {
    if (showMenu) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    }
  }, [showMenu]);

  const closeMenu = (route: any) => {
    setShowMenu((prevState) => !prevState);
    return route;
  };

  window.onclick = (event: any) => {
    if (event.target.matches('.menu-bg')) {
      setShowMenu(false);
    }
  };

  const handleMenuClick = (e: any) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menu1 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <span onClick={() => push('InventoryListPage')}>Список инвентаря</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={() => push('WerehouseListPage')}>Список материалов</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={() => push('UserListPage')}>Список персонала</span>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="4">
        <span onClick={() => push('SalaryListPage')}>Список зарплат</span>
      </Menu.Item>
      <Menu.Item key="5">
        <span onClick={() => push('ObjectListPage')}>Список обьектов</span>
      </Menu.Item>
      <Menu.Item key="6">
        <span onClick={() => push('WaitingObjectListPage')}>
          Cписок ожидания
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {showMenu && <div className="menu-bg"></div>}

      <div className="container">
        <div className="company-logo">
          <img src="../assets/img/logo.png" alt="logo" />
        </div>

        <div className="header">
          <div className="header-line">
            <Button>
              <span onClick={() => push('UserProfilePage')}>Admin</span>
            </Button>
            <Button>
              <span onClick={() => push('CurrentObjectPage')}>
                Текущие объекты
              </span>
            </Button>
            <Button>
              <span onClick={() => push('CreateObjectPage')}>
                Создать объект
              </span>
            </Button>
            <Button>
              <span onClick={() => push('WorkListPage')}>Список работ</span>
            </Button>
            <Button>
              <span onClick={() => push('AdminCreateUserPage')}>
                Создать пользователя
              </span>
            </Button>

            <Dropdown overlay={menu2}>
              <Button>
                Списки Зп./Объе./Ожид.
                <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown overlay={menu1}>
              <Button>
                Списки Инв./Мат./Пер. <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="media-menu" style={{ width: 300 }}>
          <Button
            className={`menu-btn ${showMenu ? 'active-btn' : 'disabled-btn'}`}
            type="primary"
            onClick={closeMenu}
            style={{ marginBottom: 16 }}
          >
            Меню
          </Button>

          {showMenu && (
            <Menu mode="inline" theme="light" className="media-menu-options">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <span onClick={() => push('UserListPage')}>Admin</span>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <span onClick={() => push('CurrentObjectPage')}>
                  Текущие объекты
                </span>
              </Menu.Item>

              <Menu.Item key="3" icon={<ContainerOutlined />}>
                <span onClick={() => push('CreateObjectPage')}>
                  Создать объект
                </span>
              </Menu.Item>

              <Menu.Item key="4" icon={<ContainerOutlined />}>
                <span onClick={() => push('WorkListPage')}>Список работ</span>
              </Menu.Item>

              <Menu.Item key="5" icon={<ContainerOutlined />}>
                <span onClick={() => push('AdminCreateUserPage')}>
                  Создать пользователя
                </span>
              </Menu.Item>

              <SubMenu
                key="sub1"
                icon={<MailOutlined />}
                title="Списки Зп./Объе./Ожид."
              >
                <Menu.Item key="6">
                  <span onClick={() => push('InventoryListPage')}>
                    Список инвентаря
                  </span>
                </Menu.Item>
                <Menu.Item key="7">
                  <span onClick={() => push('WerehouseListPage')}>
                    Список материалов
                  </span>
                </Menu.Item>
                <Menu.Item key="8">
                  <span onClick={() => push('UserListPage')}>
                    Список персонала
                  </span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub2"
                icon={<AppstoreOutlined />}
                title="Списки Инв./Мат./Пер."
              >
                <Menu.Item key="9">
                  <span onClick={() => closeMenu(push('SalaryListPage'))}>
                    Список зарплат
                  </span>
                </Menu.Item>
                <Menu.Item key="10">
                  <span onClick={() => closeMenu(push('ObjectListPage'))}>
                    Список обьектов
                  </span>
                </Menu.Item>
                <Menu.Item key="11">
                  <span
                    onClick={() => closeMenu(push('WaitingObjectListPage'))}
                  >
                    Cписок ожидания
                  </span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};
