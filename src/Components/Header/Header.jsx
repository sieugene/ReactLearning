import React from 'react';
import { NavLink } from "react-router-dom";
import './../../App.css';
import s from './Header.module.css';
import userPhoto from './../../assets/images/userPhoto.png'

const Header = (props) => {
    let getUserPhoto = () => {
        return !props.userPhoto ? <img src={userPhoto} alt='' className={s.userPhoto} /> :
            <img src={props.userPhoto.small} alt='' className={s.userPhoto} /> || <img src={props.userPhoto.large} alt={''} className={s.userPhoto} />;
    }
    return (
        <nav className={'grey darken-4'}>
            <div className="nav-wrapper">
                <div className="container">
                    <a href="#" className="brand-logo"></a>
                    <ul  className="right">
                        {props.isAuth ?
                            <>
                                <li><h5>{props.login}</h5></li>
                                <NavLink to='/profile' className={s.userlink}>
                                    <li className='btn-floating btn-large waves-effect waves-light grey darken-4'>
                                        {getUserPhoto()}
                                    </li>
                                </NavLink>
                                <li>
                                    <button onClick={props.logoutThunk} className={s.loginButton}>
                                        Log out
                                    </button>
                                </li>
                            </>
                            :
                            <li><NavLink to='/login/'>
                                <button className={s.loginButton}>
                                    Login
                        </button>
                            </NavLink>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;