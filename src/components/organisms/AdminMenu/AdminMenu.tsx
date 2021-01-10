import * as React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { InventoryList } from 'components/molecules/InventoryList/InventoryList';
import { ObjectList } from 'components/molecules/ObjectList/ObjectList';
import { SalaryList } from 'components/molecules/SalaryList/SalaryList';
import { WerehouseList } from 'components/molecules/WerehouseList/WerehouseList';
import { WorkList } from 'components/molecules/WorkList/WorkList';
import { AdminCreateUser } from 'components/molecules/AdminCreateUser/AdminCreateUser';
import { CreateObject } from 'components/molecules/CreateObject/CreateObject';

import './AdminMenu.scss';

export const AdminMenu = () => {
    return (
        <div className="container">
        <div className="header">
          <ul className="header-line">
            <li>Admin</li>
            <li>
              <NavLink to="/admin_menu/salary_list" activeClassName="selected">Список зарплат</NavLink>
            </li>
            <li>
              <NavLink to="/admin_menu/object_list" activeClassName="selected">Список обьектов</NavLink>
            </li>
            <li><NavLink to="/admin_menu/inventory_list" activeClassName="selected">Список инвентаря</NavLink></li>
            <li><NavLink to="/admin_menu/werehouse_list" activeClassName="selected">Список материалов</NavLink></li>
            <li><NavLink to="/admin_menu/create_object" activeClassName="selected">Создать обьект</NavLink></li>
            <li><NavLink to="/admin_menu/create_user" activeClassName="selected">Создать пользователя</NavLink></li>
            <li><NavLink to="/admin_menu/work_price_list" activeClassName="selected">Список работ</NavLink></li>
          </ul>
        </div>
        <div className="content">
          <Switch>
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
    )
}