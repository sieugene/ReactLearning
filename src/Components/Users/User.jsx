import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";


const User = ({user, unFollowUserThunk, followUserThunk, followingInProgress}) => {
    return (
        <div key={user.id} className={s.userMain}>
            <NavLink to={'profile/' + user.id}><img className={s.userImg} src={
                user.photos.small != null ? user.photos.small :
                    'https://www.kanali6.com.cy/sites/default/files/producer_0.png'} alt=''/></NavLink>
            <br/>
            {
                user.followed
                    ?
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollowUserThunk(user.id)
                            }}>UnFollow</button>
                    :
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                followUserThunk(user.id)
                            }}>Follow</button>
            }
            <div> Name : {user.name}</div>
            <div>Status :{user.status}</div>
            <div>City: {'u.location.city'}</div>
            <div>Country: {'u.location.country'}</div>
        </div>
    )
}

export default User;