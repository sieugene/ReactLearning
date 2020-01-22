import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Sidebar.module.css';

const Sidebar = (props) => {
    return (
        <div className={s.sidebar}>
            <NavLink to='/MyChat' activeClassName={s.active}> MyChat </NavLink><br/>
            <NavLink to='/Users' activeClassName={s.active}> Users </NavLink><br/>
            <NavLink to='/profile/' activeClassName={s.active}> Profile </NavLink><br/>
            <NavLink to='/Dialogs' activeClassName={s.active}> Dialogs </NavLink>
        </div>
    )
}

export default Sidebar;
