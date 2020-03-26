import React from 'react';
import s from './Users.module.css';
import { NavLink } from "react-router-dom";
import userPhoto from './../../assets/images/userPhoto.png'

const User = ({ user, unFollowUserThunk, followUserThunk, followingInProgress }) => {
    return (
        <div className='col xl4 s12 l4 m6'>
            <div className="card medium">
                <div className="card-image waves-effect waves-block waves-light">
                    <NavLink to={'profile/' + user.id}><img className="activator" src={
                        user.photos.small != null ? user.photos.small : userPhoto} alt='' />
                    </NavLink>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        <p className='truncate'>Name : {user.name}<br/>
                        Status : {user.status}</p>
                    </span>
                    {
                        user.followed
                            ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unFollowUserThunk(user.id)
                                }} className='btn waves-effect waves-light black'>UnFollow</button>
                            :
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    followUserThunk(user.id)
                                }} className='btn waves-effect waves-light indigo lighten-5 black-text'>Follow</button>
                    }
                    <button className={s.sendMessage} className='btn waves-effect waves-light indigo lighten-5 black-text'>
                        <NavLink to={'/Dialogs/messages/' + user.id} className='black-text'>Send message</NavLink>
                    </button>
                </div>
                </div>
        </div>
    )
}

export default User;