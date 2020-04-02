import React from 'react';
import { NavLink } from "react-router-dom";
import './../../App.css';
import s from './Header.module.css';
import userPhoto from './../../assets/images/userPhoto.png'
import DropDownNavbar from './DropDownNavbar';

type PropsType = {
    userPhoto: {
        small: string | null
        large: string | null
    }
    isAuth: boolean
    login: string | null
    dropDownToogle: () => void
    logoutThunk: () => void
    toggle: boolean
}

const Header: React.FC<PropsType> = (props) => {
    let getUserPhoto = !props.userPhoto.small || !props.userPhoto.large ?
        <img src={userPhoto} alt='' className={s.userPhoto} />
        :
        <img src={props.userPhoto.small} alt={''} className={s.userPhoto} /> ||
        <img src={props.userPhoto.large} alt={''} className={s.userPhoto} />

    return (
        <>
            <nav className={'grey darken-4'}>
                <div className="nav-wrapper">
                    <div className="container">
                        <NavLink to='/' className='logo'>Home</NavLink>
                        <ul className={"right " + s.cursor} onClick={() => { props.dropDownToogle() }}>
                            {props.isAuth ?
                                <>
                                    <li><h5>{props.login}</h5></li>
                                    <p className={s.userlink}>
                                        <li className='btn-floating btn-large waves-effect waves-light grey darken-4'>
                                            {getUserPhoto}
                                        </li>
                                    </p>
                                    <li>
                                        <i className="small material-icons">expand_more</i>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <i className="material-icons">drag_handle</i>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <DropDownNavbar logoutThunk={props.logoutThunk} toggle={props.toggle} isAuth={props.isAuth} />
        </>
    )
}

export default Header;