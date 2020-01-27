import React from 'react';
import {NavLink} from "react-router-dom";
import './../../App.css';
import s from './Header.module.css';
import userPhoto from './../../assets/images/userPhoto.png'

const Header = (props) => {
    let getUserPhoto = () => {
        return !props.userPhoto ? <img src={userPhoto} alt=''/> :
            <img src={props.userPhoto.small} alt=''/> || <img src={props.userPhoto.large} alt={''}/>;
    }
    return (
        <div className={s.header}>
            <div className={s.container}>
                {props.isAuth ?
                    <div className={s.loginBlock}>
                        <h4>{props.login}</h4>
                        {getUserPhoto()}
                        <button onClick={props.logoutThunk}>Log out</button>
                    </div> :
                    <NavLink to='/login/' className={s.loginBlock}>
                        <button className={s.loginBtn}>
                            Login
                        </button>
                    </NavLink>
                }

            </div>
        </div>
    )
}

export default Header;