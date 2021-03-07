import * as React from 'react';
import { ObjectList } from 'components/molecules/ObjectList/ObjectList';
import { useHistory } from 'estafette-router';

import './UserMenu.scss';

export const UserMenu = () => {
  const { push } = useHistory();
  return (
    <div className="container">
      <div className="header">
        <ul className="header-line">
          <li>User</li>
          <li>
            <span onClick={() => push('CreateObjectPage')}>Создать обьект</span>
          </li>
          <li>
            <span onClick={() => push('WorkListPage')}>Список работ</span>
          </li>
        </ul>
      </div>
      <div className="content">
        <ObjectList />
      </div>
    </div>
  );
};
