import * as React from 'react';
import { Dropdown, Button, Menu, message } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  MailOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRequest } from 'estafette';
import { useHistory } from 'estafette-router';
import { Context } from 'context/Context';
import { userListApi } from 'api/userListApi/userListApi';

import './AdminMenu.scss';

export const AdminMenu = () => {
  const { request, data, loading, errors } = useRequest();
  const { activeToken } = React.useContext(Context);
  const { push } = useHistory();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const fetch = () => {
    request(userListApi.getUserProfile.action({}));
  };

  console.log(data);

  React.useEffect(() => {
    if (activeToken) {
      fetch();
    }
  }, [activeToken]);

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
      <Menu.Item key="1" onClick={() => push('InventoryListPage')}>
        <span>Список инвентаря</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => push('WerehouseListPage')}>
        <span>Список материалов</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => push('UserListPage')}>
        <span>Список персонала</span>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="4" onClick={() => push('SalaryListPage')}>
        <span>Список зарплат</span>
      </Menu.Item>
      <Menu.Item key="5" onClick={() => push('ObjectListPage')}>
        <span>Список обьектов</span>
      </Menu.Item>
      <Menu.Item key="6" onClick={() => push('WaitingObjectListPage')}>
        <span>Cписок ожидания</span>
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
            <Button onClick={() => push('UserProfilePage')}>
              <span>Admin</span>
            </Button>
            <Button onClick={() => push('CurrentObjectPage')}>
              <span>Текущие объекты</span>
            </Button>
            <Button onClick={() => push('CreateObjectPage')}>
              <span>Создать объект</span>
            </Button>
            <Button onClick={() => push('WorkListPage')}>
              <span>Список работ</span>
            </Button>
            <Button onClick={() => push('AdminCreateUserPage')}>
              <span>Создать пользователя</span>
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
              <Menu.Item
                key="1"
                icon={<PieChartOutlined />}
                onClick={() => push('UserProfilePage')}
              >
                <span>Admin</span>
              </Menu.Item>

              <Menu.Item
                key="2"
                icon={<DesktopOutlined />}
                onClick={() => push('CurrentObjectPage')}
              >
                <span>Текущие объекты</span>
              </Menu.Item>

              <Menu.Item
                key="3"
                icon={<ContainerOutlined />}
                onClick={() => push('CreateObjectPage')}
              >
                <span>Создать объект</span>
              </Menu.Item>

              <Menu.Item
                key="4"
                icon={<ContainerOutlined />}
                onClick={() => push('WorkListPage')}
              >
                <span>Список работ</span>
              </Menu.Item>

              <Menu.Item
                key="5"
                icon={<ContainerOutlined />}
                onClick={() => push('AdminCreateUserPage')}
              >
                <span>Создать пользователя</span>
              </Menu.Item>

              <SubMenu
                key="sub1"
                icon={<MailOutlined />}
                title="Списки Зп./Объе./Ожид."
              >
                <Menu.Item key="6" onClick={() => push('InventoryListPage')}>
                  <span>Список инвентаря</span>
                </Menu.Item>
                <Menu.Item key="7" onClick={() => push('WerehouseListPage')}>
                  <span>Список материалов</span>
                </Menu.Item>
                <Menu.Item key="8" onClick={() => push('UserListPage')}>
                  <span>Список персонала</span>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub2"
                icon={<AppstoreOutlined />}
                title="Списки Инв./Мат./Пер."
              >
                <Menu.Item
                  key="9"
                  onClick={() => closeMenu(push('SalaryListPage'))}
                >
                  <span>Список зарплат</span>
                </Menu.Item>
                <Menu.Item
                  key="10"
                  onClick={() => closeMenu(push('ObjectListPage'))}
                >
                  <span>Список обьектов</span>
                </Menu.Item>
                <Menu.Item
                  key="11"
                  onClick={() => closeMenu(push('WaitingObjectListPage'))}
                >
                  <span>Cписок ожидания</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};
