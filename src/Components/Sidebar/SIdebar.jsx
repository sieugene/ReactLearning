import React from 'react';
import { NavLink } from "react-router-dom";
import s from './Sidebar.module.css';

const Sidebar = (props) => {
    return (
        <div className={s.sidebar}>
            <ul>
                <li>
                    <NavLink to='/profile/' activeClassName={s.active}> Profile </NavLink><br />
                </li>
                <li>
                    <NavLink to='/Dialogs' activeClassName={s.active}> Dialogs </NavLink><br />
                </li>
                <li>
                    <NavLink to='/Users' activeClassName={s.active}> Users </NavLink><br />
                </li>
                <li>
                    <button onClick={props.logoutThunk} className={s.loginButton}>
                        Log out
                </button>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;
