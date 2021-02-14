import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { Context } from 'components/context/Context';

import './UserList.scss';

export const UserList = () => {
    const { salaryList } = React.useContext(Context);

    return (
        <div className="user-list">
        <div className="title">
          <div className="title__text">Список персонала</div>
          {/* <button className="add-button">Добавить</button> */}
        </div>
        <div className="item_list">
          {salaryList.map((item, index) => (
            <div className="user-item-content" key={item.name}>
                <NavLink to="/admin_menu/user_profile_add_material">
                    <div className="user-item">
                        <div className="user-item__name">{item.name}</div>
                        <div className="user-item__quantity">
                            Телефон: {item.phone}
                        </div>
                        <div className="user-item__price">Мат. на сумму : 14550 лей.</div>
                        {/* <div className="button-edit-user">
                            <button>Редактировать</button>
                        </div> */}
                        {/* <div className="button-delete-user">
                            <button>Удалить</button>
                        </div> */}
                    </div>
                </NavLink>
                    <div className="button-edit-user">
                        <NavLink to="/admin_menu/user_profile_edit_material">
                            <Button><span>Редактировать</span></Button>
                        </NavLink>
                    </div>
            </div>
          ))}
        </div>
      </div>
    )
}