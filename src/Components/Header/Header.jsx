import React from 'react';
import {NavLink} from "react-router-dom";
import './../../App.css';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <div className={s.header}>
            {props.isAuth ? <div class={s.loginBlock}>{props.login}</div> :
                <NavLink to='/login/' className={s.loginBlock}> Login </NavLink>
            }
            <NavLink to='/MyChat'> MyChat </NavLink><br/>
            <NavLink to='/Users'> Users </NavLink><br/>
            <NavLink to='/profile/'> Profile </NavLink>
        </div>
    )
}

export default Header;