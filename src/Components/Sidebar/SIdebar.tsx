import React from 'react';
import { NavLink } from "react-router-dom";
import s from './Sidebar.module.css';

type PropsType = {
    isAuth: boolean
    logoutThunk: () => void
}

const Sidebar:React.FC<PropsType> = (props) => {
    return (
        <div className={s.sidebar}>
            <ul>
                {props.isAuth ?
                    <>
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
                    </>
                    :
                    <>
                        <li>
                            <NavLink to='/Dialogs' activeClassName={s.active}> Dialogs </NavLink><br />
                        </li>
                        <li>
                            <NavLink to='/Users' activeClassName={s.active}> Users </NavLink><br />
                        </li>
                        <li>
                            <button className={s.loginButton}>
                                <NavLink to='/login/'>
                                    Login
                                </NavLink>
                            </button>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Sidebar;
