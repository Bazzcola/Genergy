import * as React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
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
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const mediaMenu = React.useRef<any>();

  const closeMenu = () => {
    setShowMenu((prevState) => !prevState);
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
        <NavLink to="/admin_menu/inventory_list" activeClassName="selected">
          <span>Список инвентаря</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/admin_menu/werehouse_list" activeClassName="selected">
          <span>Список материалов</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/admin_menu/user_list" activeClassName="selected">
          <span>Список персонала</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="4">
        <NavLink to="/admin_menu/salary_list" activeClassName="selected">
          <span>Список зарплат</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="5">
        <NavLink to="/admin_menu/object_list" activeClassName="selected">
          <span>Список обьектов</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="6">
        <NavLink
          to="/admin_menu/object_waiting_list"
          activeClassName="selected"
        >
          <span>Cписок ожидания</span>
        </NavLink>
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
              <NavLink to="/admin_menu/user_profile" activeClassName="selected">
                Admin
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/admin_menu/curent_object"
                activeClassName="selected"
              >
                Текущие объекты
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/admin_menu/create_object"
                activeClassName="selected"
              >
                Создать объект
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/admin_menu/work_price_list"
                activeClassName="selected"
              >
                Список работ
              </NavLink>
            </Button>
            <Button>
              <NavLink to="/admin_menu/create_user" activeClassName="selected">
                Создать пользователя
              </NavLink>
            </Button>

            <Dropdown overlay={menu2}>
              <Button>
                Списки Зп./Объе./Ожид. <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown overlay={menu1}>
              <Button>
                Списки Инв./Мат./Пер. <DownOutlined />
              </Button>
            </Dropdown>
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
              <Menu
                mode="inline"
                theme="light"
                className="media-menu-options"
                ref={mediaMenu}
              >
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <NavLink
                    to="/admin_menu/user_profile"
                    activeClassName="selected"
                  >
                    Admin
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  <NavLink
                    to="/admin_menu/curent_object"
                    activeClassName="selected"
                  >
                    Текущие объекты
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="3" icon={<ContainerOutlined />}>
                  <NavLink
                    to="/admin_menu/create_object"
                    activeClassName="selected"
                  >
                    Создать объект
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="4" icon={<ContainerOutlined />}>
                  <NavLink
                    to="/admin_menu/work_price_list"
                    activeClassName="selected"
                  >
                    Список работ
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="5" icon={<ContainerOutlined />}>
                  <NavLink
                    to="/admin_menu/create_user"
                    activeClassName="selected"
                  >
                    Создать пользователя
                  </NavLink>
                </Menu.Item>

                <SubMenu
                  key="sub1"
                  icon={<MailOutlined />}
                  title="Списки Зп./Объе./Ожид."
                >
                  <Menu.Item key="6">
                    <NavLink
                      to="/admin_menu/inventory_list"
                      activeClassName="selected"
                    >
                      <span>Список инвентаря</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <NavLink
                      to="/admin_menu/werehouse_list"
                      activeClassName="selected"
                    >
                      <span>Список материалов</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <NavLink
                      to="/admin_menu/user_list"
                      activeClassName="selected"
                    >
                      <span>Список персонала</span>
                    </NavLink>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub2"
                  icon={<AppstoreOutlined />}
                  title="Списки Инв./Мат./Пер."
                >
                  <Menu.Item key="9">
                    <NavLink
                      to="/admin_menu/salary_list"
                      activeClassName="selected"
                    >
                      <span>Список зарплат</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <NavLink
                      to="/admin_menu/object_list"
                      activeClassName="selected"
                    >
                      <span>Список обьектов</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <NavLink
                      to="/admin_menu/object_waiting_list"
                      activeClassName="selected"
                    >
                      <span>Cписок ожидания</span>
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            )}
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route path="/admin_menu/curent_object" exact>
              <CurrentObject />
            </Route>
            <Route path="/admin_menu/edit_object" exact>
              <EditObject />
            </Route>
            <Route path="/admin_menu/edit_object_worker_time" exact>
              <AddWorkerTime />
            </Route>
            <Route path="/admin_menu/user_profile_edit_material" exact>
              <ProfileEditMat />
            </Route>
            <Route path="/admin_menu/object_waiting_list" exact>
              <WaitingObjectList />
            </Route>
            <Route path="/admin_menu/user_profile_add_material" exact>
              <ProfileAddMat />
            </Route>
            <Route path="/admin_menu/user_profile" exact>
              <UserProfile />
            </Route>
            <Route path="/admin_menu/user_list" exact>
              <UserList />
            </Route>
            <Route path="/admin_menu/salary_list" exact>
              <SalaryList />
            </Route>
            <Route path="/admin_menu/inventory_list" exact>
              <InventoryList />
            </Route>
            <Route path="/admin_menu/object_list" exact>
              <ObjectList />
            </Route>
            <Route path="/admin_menu/werehouse_list" exact>
              <WerehouseList />
            </Route>
            <Route path="/admin_menu/work_price_list" exact>
              <WorkList />
            </Route>
            <Route path="/admin_menu/create_user" exact>
              <AdminCreateUser />
            </Route>
            <Route path="/admin_menu/create_object" exact>
              <CreateObject />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};
