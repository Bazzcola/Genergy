import * as React from 'react';
import { ObjectList } from 'components/molecules/ObjectList/ObjectList';
import { NavLink, Switch, Route } from 'react-router-dom';

import './UserMenu.scss';

export const UserMenu = () => {
    return (
        <div className="container">
        <div className="header">
          <ul className="header-line">
            <li>User</li>
            <li><NavLink to="/create_object" activeClassName="selected">Создать обьект</NavLink></li>
            <li><NavLink to="/work_price_list" activeClassName="selected">Список работ</NavLink></li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/object_list" exact>
              <ObjectList />
            </Route>
          </Switch>
        </div>
      </div>
    )
}