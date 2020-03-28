import React from 'react';
import { NavLink } from "react-router-dom";
import './../../App.css';
import s from './Header.module.css';
import userPhoto from './../../assets/images/userPhoto.png'
import DropDownNavbar from './DropDownNavbar';


const Header = (props) => {
    let getUserPhoto = () => {
        return !props.userPhoto ? <img src={userPhoto} alt='' className={s.userPhoto} /> :
            <img src={props.userPhoto.small} alt='' className={s.userPhoto} /> || <img src={props.userPhoto.large} alt={''} className={s.userPhoto} />;
    }
    return (
        <>
            <nav className={'grey darken-4'}>
                <div className="nav-wrapper">
                    <div className="container">
                        {/* <a href="/" className="brand-logo"></a> */}
                        <ul className={"right " + s.cursor} onClick={() => { props.dropDownToogle() }}>
                            {props.isAuth ?
                                <>
                                    <li><h5>{props.login}</h5></li>
                                    <p to='/profile' className={s.userlink}>
                                        <li className='btn-floating btn-large waves-effect waves-light grey darken-4'>
                                            {getUserPhoto()}
                                        </li>
                                    </p>
                                    <li>
                                        <i className="small material-icons">expand_more</i>
                                    </li>
                                </>
                                :
                                <button className={s.loginButton}>
                                    <NavLink to='/login/'>
                                        Login
                                    </NavLink>
                                </button>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {props.isAuth && <DropDownNavbar logoutThunk={props.logoutThunk} toggle={props.toggle} />}
        </>
    )
}

export default Header;